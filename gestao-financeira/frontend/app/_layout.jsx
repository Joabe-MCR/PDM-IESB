import { useContext, useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import GlobalState from "../contexts/GlobalState";
import AuthProvider, { AuthContext } from "../contexts/AuthContext";

function RootLayoutContent() {
  const { user, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      // Redireciona para o login se não estiver logado
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redireciona para home se já estiver logado
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  if (loading) {
    return null; // ou um componente de loading real
  }

  return (
    <GlobalState>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Todas as rotas declaradas para o expo-router conhecer */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalState>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
