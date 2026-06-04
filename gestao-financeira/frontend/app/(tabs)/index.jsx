import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { MoneyContext } from "../../contexts/GlobalState";
import { AuthContext } from "../../contexts/AuthContext";
import TransactionItem from "../../components/TransactionItem";
import EditTransactionModal from "../../components/EditTransactionModal";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";

/**
 * Tela "Transações".
 *
 * Lista as transações vindas do servidor, com:
 *  - estado de carregamento inicial,
 *  - mensagem de erro com botão de "Tentar novamente",
 *  - pull-to-refresh,
 *  - long-press para excluir/editar,
 *  - modal de edição de transação,
 *  - filtro de mês/ano.
 *
 * @returns {JSX.Element}
 */
export default function Transactions() {
  const { transactions, categories, loading, error, refresh, removeTransaction, updateTransaction } =
    useContext(MoneyContext);
  const { user } = useContext(AuthContext);

  const [filterMonth, setFilterMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFilterMonth(selectedDate);
    }
    setShowDatePicker(false);
  };

  const filteredTransactions = transactions.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === filterMonth.getMonth() &&
      itemDate.getFullYear() === filterMonth.getFullYear()
    );
  });

  const handleLongPress = (item) => {
    Alert.alert(
      "Transação",
      `O que deseja fazer com "${item.description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Editar",
          onPress: () => {
            setEditingTransaction(item);
            setShowEditModal(true);
          },
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await removeTransaction(item.id);
              Alert.alert("Sucesso", "Transação excluída com sucesso!");
            } catch (e) {
              Alert.alert("Erro ao excluir", e.message ?? "Tente novamente.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await updateTransaction(editingTransaction.id, updatedData);
      setShowEditModal(false);
      setEditingTransaction(null);
      Alert.alert("Sucesso", "Transação atualizada com sucesso!");
    } catch (e) {
      throw e;
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.secondaryText}>Carregando transações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <Text style={globalStyles.primaryText}>
          Não foi possível carregar.
        </Text>
        <Text style={globalStyles.secondaryText}>{error}</Text>
        <TouchableOpacity onPress={refresh} style={styles.retry}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={globalStyles.screenContainer}>
        {/* Welcome Message */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            👋 Bem-vindo, <Text style={styles.userName}>{user?.name}</Text>!
          </Text>
          <Text style={styles.welcomeSubtext}>
            Aqui estão suas transações do mês
          </Text>
        </View>

        {/* Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
            <Text style={styles.filterText}>
              {filterMonth.toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={filterMonth}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        {/* Transactions List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              activeOpacity={0.7}
            >
              <TransactionItem {...item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={globalStyles.secondaryText}>
              Nenhuma transação neste mês. Adicione uma na aba do meio!
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Edit Modal */}
      <EditTransactionModal
        visible={showEditModal}
        transaction={editingTransaction}
        categories={categories}
        onSave={handleSaveEdit}
        onCancel={() => {
          setShowEditModal(false);
          setEditingTransaction(null);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  welcomeCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryContrast,
  },
  userName: {
    fontWeight: "800",
  },
  welcomeSubtext: {
    fontSize: 12,
    color: colors.primaryContrast,
    opacity: 0.8,
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "capitalize",
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
  },
  retry: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryText: {
    color: colors.primaryContrast,
    fontWeight: "600",
  },
});
