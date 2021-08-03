import React, { createContext, useEffect } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { autorun } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const globalContext = createContext();

export const GlobalStoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    isLogin: false,
    tabBarState: true,

    setLogin() {
      store.isLogin = true;
    },

    setLogout() {
      // await AsyncStorage.removeItem("token");
      store.isLogin = false;
    },

    setTabBarVisible() {
      store.tabBarState = true;
    },

    setTabBarHidden() {
      store.tabBarState = false;
    },
  }));

  // useEffect(
  //   () =>
  //     autorun(async () => {
  //       const userToken = await AsyncStorage.getItem("token");
  //       userToken === null ? store.setLogout() : store.setLogin();
  //     }),
  //   []
  // );

  return <globalContext.Provider value={store}>{children}</globalContext.Provider>;
};
