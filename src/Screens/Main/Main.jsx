import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Image, ScrollView, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { Header, Button, Icon, Text, Div, Collapse, Skeleton } from "react-native-magnus";
import { LinearGradient } from "expo-linear-gradient";
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

const Main = observer(({ navigation }) => {
  const [contractsData, setContractsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isContractsLoading, setIsContractsLoading] = useState(false);
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const store = useContext(globalContext);
  const handleTabBarHidden = () => {
    store.setTabBarHidden();
  };
  const handleTabBarVisible = () => {
    setTimeout(() => {
      store.setTabBarVisible();
    }, 1000);
  };

  const getContractsData = async () => {
    setIsContractsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("token");
      const clientid = await AsyncStorage.getItem("clientId");
      // const token = localStorage.getItem("userToken");
      const resp = await axios.get(`${baseURL}slman/getcontractsformobile/${clientid}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },

        timeout: 4000,
      });
      console.log(resp.data.result);
      setTimeout(() => {
        setContractsData(resp.data.result);
        setIsContractsLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log("req err");
      } else {
        console.log(error);
      }
    }
  };

  const getEventsData = async () => {
    // setIsContractsLoading(true);
    setIsEventsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("token");
      const clientid = await AsyncStorage.getItem("clientId");
      const limit = 10;
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
        console.log("req err");
      } else {
        console.log(error);
      }
    }
  };

  const onRefresh = () => {
    setContractsData([]);
    setEventsData([]);
    getContractsData();
    getEventsData();
  };

  useEffect(() => {
    getContractsData();
    getEventsData();
    // store.setTabBarVisible();
  }, []);

  return (
    <View>
      <ScrollView
        style={{ elevation: 3 }}
        onMomentumScrollBegin={() => {
          handleTabBarHidden();
        }}
        onMomentumScrollEnd={() => {
          handleTabBarVisible();
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {refreshing ? <ActivityIndicator /> : null}

        <Text style={styles.textContainer} fontSize="5xl" fontWeight="bold">
          Ваши боксы
        </Text>

        {isContractsLoading ? (
          <Div h={200} w={windowWidth - 50} ml={15} mb={10} mr={5} mt={10} rounded="2xl" shadow="md" elevation={4} bg="blue800">
            <Skeleton.Box h={30} m={20} w="90%" />

            <Skeleton.Box h={20} m={10} ml={20} w="80%" />
            <Skeleton.Box h={20} m={10} ml={20} w="80%" />
            <Skeleton.Box h={20} m={10} ml={20} w="80%" />
          </Div>
        ) : (
          <FlatList
            keyExtractor={(element) => element._id}
            data={contractsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ elevation: 5 }}
            renderItem={({ item }) => {
              return (
                // <React.Fragment>
                <LinearGradient
                  colors={["#004680", "#e65500"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    elevation: 6,
                    height: 200,
                    width: windowWidth - 40,
                    // marginLeft: 10,
                    marginBottom: 10,
                    // marginRight: 10,
                    marginTop: 10,
                    borderRadius: 20,
                    marginStart: 10,
                    marginEnd: 10,
                  }}
                >
                  {/* <Div h={200} w={windowWidth - 50} ml={15} mb={10} mr={5} mt={10} rounded="2xl" bg="transparent"> */}
                  <View style={{ margin: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                      <Text fontSize="4xl" fontWeight="bold" color="white">
                        Бокс: {item.boxId.name}, {item.boxId.size} {item.boxId.sizeType}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("BoxDetail", {
                            contractId: item._id,
                            boxId: item.boxId._id,
                            boxName: item.boxId.name,
                            size: item.boxId.size,
                            sizeType: item.boxId.sizeType,
                            unitName: item.unitId.name,
                            floorName: item.boxId.floorId.name,
                            client: item.clientId.name,
                            contractName: item.name,
                            startDate: item.startDate,
                            finishDate: item.finishDate,
                            numberOfDays: item.numberOfDays,
                            paidBefore: item.paidBefore,
                            dayTariff: item.dayTariff,
                          });
                        }}
                      >
                        <Icon name="ios-ellipsis-vertical" fontFamily="Ionicons" fontSize="6xl" color="white" mt={5} />
                      </TouchableOpacity>
                    </View>

                    <Text fontSize="xl" fontWeight="bold" color="white" mb={5}>
                      Объект: {item.unitId.name}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={5}>
                      Оплачен до: {item.paidBefore ? dayjs(item.paidBefore).locale("ru").format("DD MMMM YYYY") : null}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="white">
                      Статус договора: {item.statusId.name}
                    </Text>
                  </View>
                  {/* </Div> */}
                </LinearGradient>
              );
              // </React.Fragment>
            }}
          />
        )}

        <Div flexDir="row" justifyContent="space-between" alignItems="center" m={20} mr={30}>
          <Text fontSize="4xl" fontWeight="bold">
            Последние события
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("History");
            }}
          >
            <Icon name="md-chevron-forward" fontFamily="Ionicons" fontSize="4xl" color="gray700" alignSelf="center" />
          </TouchableOpacity>
        </Div>

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
          <View style={{ paddingBottom: 110 }}>
            {eventsData.map((data, key) => {
              return (
                <Div h={100} rounded="xl" shadow="sm" p={20} key={data._id} m={10} mb={10} bg="white">
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "column" }}>
                      <Text fontSize="2xl" fontWeight="bold">
                        Бокс {data.boxId.name}
                      </Text>
                      <Text>{data.eventId.name}</Text>
                      <Text>{dayjs(data.eventDate).locale("ru").format("DD MMMM YYYY, HH:mm")}</Text>
                    </View>
                    <Icon
                      name={data.eventId.name === "Открыт" || data.eventId.name === "Открыт из приложения" ? "lock-open" : "lock-outline"}
                      fontFamily="MaterialIcons"
                      fontSize="5xl"
                      color={data.eventId.name === "Открыт" || data.eventId.name === "Открыт из приложения" ? "#e65500" : "green"}
                    />
                  </View>
                </Div>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>

    // <View style={styles.mainContainer}>

    //   <Text>MAIN</Text>
    // </View>
  );
});

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
  },
  textContainer2: {
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "center",
  },
  logo: {
    marginTop: 20,
    width: windowWidth / 3,
    resizeMode: "contain",
    height: 35,
    alignSelf: "center",
  },
  midContainer: {
    paddingTop: 20,
    width: "100%",
    height: windowHeight / 7,
    elevation: 2,
  },
});
