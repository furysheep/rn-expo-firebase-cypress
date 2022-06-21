import "react-native-gesture-handler";
import React from "react";
import "./src/config/firebase";
import RootNavigation from "./src/navigation";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootNavigation />
    </ThemeProvider>
  );
}
