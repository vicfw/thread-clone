import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, router } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider, useSelector } from "react-redux";
import Store from "../redux/Store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={Store}>
        <InitialRoute />
      </Provider>
    </ThemeProvider>
  );
}

const InitialRoute = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
