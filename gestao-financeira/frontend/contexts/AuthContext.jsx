import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

/**
 * Provider de autenticação do app.
 *
 * Gerencia:
 *  - Persistência de usuário autenticado em AsyncStorage
 *  - Estado de carregamento da autenticação
 *  - Ações para login, logout e verificação de sessão
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element} Provider com o objeto de contexto exposto via `AuthContext`.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Verifica se há um usuário armazenado em AsyncStorage
   * @returns {Promise<void>}
   */
  const checkSession = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Erro ao verificar sessão:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  /**
   * Realiza o login do usuário
   *
   * @param {{name: string, email: string}} data - Dados do usuário
   * @returns {Promise<object>} Usuário autenticado
   */
  const login = useCallback(async (data) => {
    setError(null);
    try {
      // Validação básica
      if (!data.name || data.name.trim().length === 0) {
        throw new Error("Nome inválido");
      }
      if (!data.email || !data.email.includes("@")) {
        throw new Error("Email inválido");
      }

      // Simulação de autenticação (sem backend)
      // Em produção, você faria uma requisição POST para /auth/login
      const userData = {
        id: Date.now().toString(),
        name: data.name.trim(),
        email: data.email.trim(),
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("@auth_user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (e) {
      const errorMsg = e.message || "Erro ao fazer login";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, []);

  /**
   * Realiza o logout do usuário
   *
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("@auth_user");
      setUser(null);
      setError(null);
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
