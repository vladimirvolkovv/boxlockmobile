import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { GlobalStoreProvider, globalContext } from "./src/Store/GlobalStore";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./src/Navigation/LoginStack";
import MainStack from "./src/Navigation/MainStack";
import { NativeBaseProvider } from "native-base";

const AppWrapped = observer((props) => {
  const store = useContext(globalContext);

  return <NavigationContainer>{store.isLogin ? <MainStack /> : <LoginStack />}</NavigationContainer>;
});

const App = () => {
  return (
    <NativeBaseProvider>
      <GlobalStoreProvider>
        <AppWrapped />
      </GlobalStoreProvider>
    </NativeBaseProvider>
  );
};

export default App;
