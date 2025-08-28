import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/utils/authStore";
import { useEffect } from "react";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();
  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="sign-in" />
          <Stack.Protected guard={shouldCreateAccount}>
            <Stack.Screen name="create-account" />
          </Stack.Protected>
        </Stack.Protected>
        {/* <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
