import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Badge } from "react-native-magnus";
import History from "../Screens/Main/History";
import Main from "../Screens/Main/Main";
import BoxDetail from "../Screens/Main/BoxDetail";
import Profile from "../Screens/Main/Profile";
import Settings from "../Screens/Main/Settings";
import HeaderButtonLogout from "../Components/headerButtonLogout";
import { MaterialCommunityIcons, Feather, Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { observer } from "mobx-react-lite";
import { globalContext } from "../Store/GlobalStore";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SaleStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const MainStack = observer(() => {
  const store = useContext(globalContext);
  const tbs = store.tabBarState ? true : false;

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: tbs ? 30 : 0,
          left: 30,
          right: 30,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 100,
          height: 65,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeStackScreen}
        // getComponent={() => <Image style={styles.logo} source={require("../Images/boxLockLogoPng.png")} />}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="ios-home" size={30} style={{ width: 30, height: 30 }} color={focused ? "#E65500" : "gray"} />,
          tabBarVisible: tbs,
          // unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="ios-list" size={30} style={{ width: 30, height: 30 }} color={focused ? "#E65500" : "gray"} />,
          tabBarVisible: tbs,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SaleStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            // <Badge ml="md" width={15} height={15}>
            <Ionicons name="ios-newspaper" size={30} style={{ width: 30, height: 30 }} color={focused ? "#E65500" : "gray"} />
            // </Badge>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name="ios-settings" size={30} style={{ width: 30, height: 30 }} color={focused ? "#E65500" : "gray"} />,
        }}
      />
    </Tab.Navigator>
  );
});

export default MainStack;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#004680",
        height: 100,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",

        alignSelf: "center",
      },
    }}
  >
    <HomeStack.Screen
      name="Main"
      component={Main}
      options={{
        title: "Main",
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderButtonLogout />,
      }}
    />
    <HomeStack.Screen
      name="BoxDetail"
      component={BoxDetail}
      options={{
        title: "BOX DETAIL",
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderButtonLogout />,
      }}
    />
  </HomeStack.Navigator>
);

const SaleStackScreen = ({ navigation }) => (
  <SaleStack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#004680",
        height: 100,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",

        alignSelf: "center",
      },
    }}
  >
    <SaleStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Main",
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderButtonLogout />,
      }}
    />
  </SaleStack.Navigator>
);

const HistoryStackScreen = ({ navigation }) => (
  <HistoryStack.Navigator
    initialRouteName="History"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#004680",
        height: 100,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",

        alignSelf: "center",
      },
    }}
  >
    <HistoryStack.Screen
      name="History"
      component={History}
      options={{
        title: "Main",
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderButtonLogout />,
      }}
    />
  </HistoryStack.Navigator>
);

const SettingsStackScreen = ({ navigation }) => (
  <SettingsStack.Navigator
    initialRouteName="Settings"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#004680",
        height: 100,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",

        alignSelf: "center",
      },
    }}
  >
    <SettingsStack.Screen
      name="Settings"
      component={Settings}
      options={{
        title: "Main",
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderButtonLogout />,
      }}
    />
  </SettingsStack.Navigator>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, resizeMode: "contain", height: 25, alignSelf: "center", alignItems: "center" }}
      source={require("../Images/boxLockLogoPng.png")}
    />
  );
}
