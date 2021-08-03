import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Image, ScrollView, FlatList, RefreshControl, ActivityIndicator, SafeAreaView } from "react-native";
import { Header, Button, Icon, Text, Div, Collapse, Skeleton } from "react-native-magnus";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../Helpers/baseURL";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { globalContext } from "../../Store/GlobalStore";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const History = observer(() => {
  const [eventsData, setEventsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isEventsLoading, setIsEventsLoading] = useState(false);

  const store = useContext(globalContext);
  const handleTabBarHidden = () => {
    store.setTabBarHidden();
  };
  const handleTabBarVisible = () => {
    setTimeout(() => {
      store.setTabBarVisible();
    }, 1000);
  };
  const getEventsData = async () => {
    setIsEventsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("token");
      const clientid = await AsyncStorage.getItem("clientId");
      const limit = 50;
      // const token = localStorage.getItem("userToken");
      const resp = await axios.get(`${baseURL}sladm/getcontrollerseventsformobileclient/${limit}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },

        timeout: 4000,
      });
      // console.log(resp.data.result);
      const nofl = resp.data.result;
      const fl = nofl.filter((val) => val.eventId.name === "Открыт" || val.eventId.name === "Открыт из приложения" || val.eventId.name === "Закрыт");
      setTimeout(() => {
        setEventsData(fl);
        setRefreshing(false);
        setIsEventsLoading(false);
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const onRefresh = () => {
    setEventsData([]);
    getEventsData();
  };

  // const fetchMore = () => {
  //   setDate((prevState) => [...prevState, ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length)]);
  // };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text fontSize="5xl" fontWeight="bold" mt={15} mb={15} ml={20}>
        События
      </Text>
      {isEventsLoading ? (
        <React.Fragment>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
          <Div h={100} rounded="xl" shadow="sm" p={20} m={10} mb={10} bg="white">
            <Skeleton.Box h={60} w="90%" />
          </Div>
        </React.Fragment>
      ) : (
        <FlatList
          keyExtractor={(element) => element._id}
          data={eventsData}
          onMomentumScrollBegin={() => {
            handleTabBarHidden();
          }}
          onMomentumScrollEnd={() => {
            handleTabBarVisible();
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            return (
              <Div h={100} rounded="xl" shadow="sm" p={20} key={item._id} m={10} mb={10} bg="white">
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text fontSize="2xl" fontWeight="bold">
                      Бокс {item.boxId.name}
                    </Text>
                    <Text>{item.eventId.name}</Text>
                    <Text>{dayjs(item.eventDate).locale("ru").format("DD MMMM YYYY, HH:mm")}</Text>
                  </View>
                  <Icon
                    name={item.eventId.name === "Открыт" || item.eventId.name === "Открыт из приложения" ? "lock-open" : "lock-outline"}
                    fontFamily="MaterialIcons"
                    fontSize="5xl"
                    color={item.eventId.name === "Открыт" || item.eventId.name === "Открыт из приложения" ? "#e65500" : "green"}
                  />
                </View>
              </Div>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
});

export default History;

const styles = StyleSheet.create({});
