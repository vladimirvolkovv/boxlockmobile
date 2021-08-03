import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login/Login";
import PasswordRecovery from "../Screens/Login/PasswordRecovery";
import { observer } from "mobx-react-lite";
import { globalContext } from "../Store/GlobalStore";

const LoginStack = observer(() => {
  const store = useContext(globalContext);

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen
        // headerTitle="Вход"
        name="Login"
        component={Login}
        // options={{
        //   title: "Вход",
        //   headerTitleAlign: "center",
        //   headerStyle: { backgroundColor: "#E65500" },
        //   headerTitleStyle: { color: "#ffffff" },
        // }}
      />
      <Stack.Screen
        // headerTitle="Добавить клиента"
        name="PasswordRecovery"
        component={PasswordRecovery}
        // options={{
        //   title: "Восстановить пароль",
        //   headerTitleAlign: "center",
        //   headerStyle: { backgroundColor: "#E65500" },
        //   headerTitleStyle: { color: "#ffffff" },
        // }}
      />
    </Stack.Navigator>
  );
});

export default LoginStack;
