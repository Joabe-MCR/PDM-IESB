import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { colors } from "../constants/colors";

/**
 * Tela de Login.
 *
 * Permite ao usuário fazer login inserindo nome e email.
 * Os dados são armazenados em AsyncStorage para persistência.
 *
 * @returns {JSX.Element}
 */
export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, insira seu nome.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setSubmitting(true);
    try {
      await login({ name: name.trim(), email: email.trim() });
    } catch (e) {
      Alert.alert("Erro ao fazer login", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Gestão Financeira</Text>
            <Text style={styles.subtitle}>Bem-vindo ao seu controle financeiro</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor={colors.secondaryText}
                value={name}
                onChangeText={setName}
                editable={!submitting}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu.email@example.com"
                placeholderTextColor={colors.secondaryText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!submitting}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color={colors.primaryContrast} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={styles.infoText}>
              💡 Use qualquer email válido para entrar na aplicação
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    gap: 32,
  },
  header: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border || "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.primaryText,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.primaryContrast,
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
