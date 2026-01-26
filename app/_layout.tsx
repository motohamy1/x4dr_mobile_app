import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import "../global.css";

export default function RootLayout() {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.light.background,
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.light.background,
          },
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
