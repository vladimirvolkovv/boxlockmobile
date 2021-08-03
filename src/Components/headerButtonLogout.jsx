import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { globalContext } from "../Store/GlobalStore";

const headerButtonLogout = observer(() => {
  const store = useContext(globalContext);
  return (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => {
        store.setLogout();
      }}
    >
      <Ionicons name="md-exit-outline" size={28} backgroundColor="#009387" color="white"></Ionicons>
    </TouchableOpacity>
  );
});

export default headerButtonLogout;

const styles = StyleSheet.create({});
