import { useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { MoneyContext } from "../../contexts/GlobalState";
import SummaryItem from "../../components/SummaryItem";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";

/**
 * Tela "Resumo".
 *
 * Itera sobre as categorias vindas do servidor (não há mais lista hardcoded)
 * e calcula:
 *  - totais por categoria (somatório dos `value` das transações da categoria);
 *  - saldo final = soma das transações de categorias `isIncome` menos as demais.
 *  - gráfico de pizza com os totais.
 *  - filtro de mês/ano.
 *
 * @returns {JSX.Element}
 */
export default function Summary() {
  const { transactions, categories, loading } = useContext(MoneyContext);
  const [filterMonth, setFilterMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const { totalsById, balance, chartData } = useMemo(() => {
    const acc = {};
    let saldo = 0;

    for (const c of categories) acc[c.id] = 0;

    for (const t of filteredTransactions) {
      const numericValue = Number(t.value);
      if (acc[t.categoryId] !== undefined) {
        acc[t.categoryId] += numericValue;
      }
      const cat = t.category ?? categories.find((c) => c.id === t.categoryId);
      if (cat?.isIncome) {
        saldo += numericValue;
      } else {
        saldo -= numericValue;
      }
    }

    // Preparar dados para gráfico
    const expenseCategories = categories.filter(
      (c) => !c.isIncome && (acc[c.id] ?? 0) > 0
    );
    const chartDataValues = expenseCategories.map((c) => ({
      name: c.displayName,
      value: acc[c.id] ?? 0,
      color: c.background || colors.primary,
      legendFontColor: colors.primaryText,
      legendFontSize: 12,
    }));

    return { totalsById: acc, balance: saldo, chartData: chartDataValues };
  }, [filteredTransactions, categories]);

  if (loading && categories.length === 0) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const balanceStyle =
    balance >= 0 ? globalStyles.positiveText : globalStyles.negativeText;

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView style={globalStyles.content}>
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

        {/* Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceCardText}>Saldo do Período</Text>
          <Text style={[balanceStyle, styles.balanceCardValue]}>
            {balance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>

        {/* Pie Chart */}
        {chartData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Despesas por Categoria</Text>
            <PieChart
              data={chartData}
              width={280}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
              }}
              center={[0, 0]}
              accessor={"value"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              absolute
              style={styles.chart}
            />
          </View>
        )}

        {/* Categories Summary */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Resumo por Categoria</Text>
          {categories.map((category) => (
            <SummaryItem
              key={category.id}
              category={category}
              value={totalsById[category.id] ?? 0}
            />
          ))}
        </View>

        <View style={globalStyles.line} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
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
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  balanceCardText: {
    fontSize: 14,
    color: colors.primaryContrast,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceCardValue: {
    fontSize: 28,
    fontWeight: "800",
  },
  chartContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 0,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 12,
  },
});
