import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import DescriptionInput from "./DescriptionInput";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import CategoryPicker from "./CategoryPicker";
import { colors } from "../constants/colors";

/**
 * Modal para editar uma transação existente.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Se o modal está visível
 * @param {Object} props.transaction - Dados da transação a editar
 * @param {Array} props.categories - Lista de categorias disponíveis
 * @param {Function} props.onSave - Callback quando salvar (recebe dados atualizados)
 * @param {Function} props.onCancel - Callback quando cancelar
 * @returns {JSX.Element}
 */
export default function EditTransactionModal({
  visible,
  transaction,
  categories,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    description: transaction?.description ?? "",
    value: transaction?.value ?? 0,
    date: transaction?.date ? new Date(transaction.date) : new Date(),
    categoryId: transaction?.categoryId ?? "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSave = useCallback(async () => {
    if (!form.description.trim()) {
      Alert.alert("Erro", "Informe a descrição.");
      return;
    }
    if (!form.value || form.value <= 0) {
      Alert.alert("Erro", "Informe um valor maior que zero.");
      return;
    }
    if (!form.categoryId) {
      Alert.alert("Erro", "Selecione uma categoria.");
      return;
    }

    setSubmitting(true);
    try {
      await onSave({
        description: form.description.trim(),
        value: form.value,
        date: form.date,
        categoryId: form.categoryId,
      });
    } catch (e) {
      Alert.alert("Erro", e.message ?? "Não foi possível salvar a transação.");
    } finally {
      setSubmitting(false);
    }
  }, [form, onSave]);

  const handleCancel = useCallback(() => {
    setForm({
      description: transaction?.description ?? "",
      value: transaction?.value ?? 0,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      categoryId: transaction?.categoryId ?? "",
    });
    onCancel();
  }, [transaction, onCancel]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} disabled={submitting}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Editar Transação</Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={submitting}
            activeOpacity={0.7}
          >
            {submitting ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.saveButton}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Description Input */}
          <View style={styles.field}>
            <Text style={styles.label}>Descrição</Text>
            <DescriptionInput
              value={form.description}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, description: text }))
              }
              editable={!submitting}
            />
          </View>

          {/* Currency Input */}
          <View style={styles.field}>
            <Text style={styles.label}>Valor</Text>
            <CurrencyInput
              value={form.value}
              onChangeValue={(value) =>
                setForm((prev) => ({ ...prev, value }))
              }
              editable={!submitting}
            />
          </View>

          {/* Date Picker */}
          <View style={styles.field}>
            <Text style={styles.label}>Data</Text>
            <DatePicker
              value={form.date}
              onChange={(date) =>
                setForm((prev) => ({ ...prev, date }))
              }
              editable={!submitting}
            />
          </View>

          {/* Category Picker */}
          <View style={styles.field}>
            <Text style={styles.label}>Categoria</Text>
            <CategoryPicker
              categories={categories}
              selectedCategoryId={form.categoryId}
              onSelectCategory={(categoryId) =>
                setForm((prev) => ({ ...prev, categoryId }))
              }
              editable={!submitting}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryText,
  },
  cancelButton: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  saveButton: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
  },
});
