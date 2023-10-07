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
import { Provider, useDispatch, useSelector } from "react-redux";
import Store, { RootState } from "../redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "../redux/actions/userAction";

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
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use Effect ran");

    (async () => {
      try {
        // await AsyncStorage.clear();
        const storageToken = await AsyncStorage.getItem("token");
        console.log(storageToken, "storageToken");

        if (!storageToken) {
          router.push("/login");
          SplashScreen.hideAsync();
        } else {
          await loadUser()(dispatch);
          router.push("/home");
          SplashScreen.hideAsync();
        }
      } catch (e) {}
    })();
  }, []);

  return <Slot />;
};

// 1:56
