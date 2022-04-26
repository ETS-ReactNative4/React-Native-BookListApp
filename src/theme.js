import Constants from "expo-constants";
import { Platform, useWindowDimensions } from "react-native";

/* Return the App Theme Object */
export default function getTheme(scheme) {
  const { width, height } = useWindowDimensions();
  const dark = "dark";
  const normalize = (size, max) => Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === "ios",
    margin: normalize(20, 35),
    colors: {
      white: dark ? "#ffffff" : "#F2F4B2",
      primary: dark ? "#ff6b6b" : "#F2F4B2",
      success: "#20bf6b",
      warning: "#f39c12",
      error: "#e74c3c",
      text: dark ? "#f2f2f2" : "#0D627A",
      card: dark ? "#0C907D" : "#CCE490",
      background: dark ? "#1a1a1a" : "#F2F4B2",
      border: dark ? "#f2f2f2dd" : "#0D627A",
      button: dark ? "#1a1a1add" : "#CCE490",
    },
    font: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
