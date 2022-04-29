import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import StatusModal from "./src/components/StatusModal";
import ToastContainer from "./src/components/Toast";
import RootNavigator from "./src/RootNavigator";
import getTheme from "./src/theme";

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={getTheme(scheme)}>
      <StatusBar />
      <StatusModal />
      <RootNavigator />
      <ToastContainer />
    </NavigationContainer>
  );
}
