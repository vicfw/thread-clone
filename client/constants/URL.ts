import { Platform } from "react-native";

export const baseUrl =
  Platform.OS === "ios"
    ? "http://localhost:3000/api/v1"
    : "http://10.0.2.2:3000/api/v1";

export const URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";
