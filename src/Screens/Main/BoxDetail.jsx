import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Button, Div, Text, Collapse, Icon, Badge } from "react-native-magnus";
import LottieView from "lottie-react-native";
import axios from "axios";
import baseURL from "../../Helpers/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { observer } from "mobx-react-lite";
import { globalContext } from "../../Store/GlobalStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const BoxDetail = observer(({ navigation, route }) => {
  const store = useContext(globalContext);
  const { boxId, boxName, size, sizeType, unitName, floorName, client, contractName, startDate, finishDate, numberOfDays, paidBefore, dayTariff } =
    route.params;
  const [currentBoxStatus, setCurrentBoxStatus] = useState("");
  const [schemaTrigger, setSchemaTrigger] = useState(true);

  const homeAnimation = useRef();
  const playAnimation = () => {
    homeAnimation.current.play(30, 150);
  };

  const resetAnimation = () => {
    homeAnimation.current.reset();
  };

  const openDoor = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      const openDoorData = {
        name: "open_door",
        boxId: boxId,
      };
      const resp = await axios.post(`${baseURL}slcl/addqueuecommand`, openDoorData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        timeout: 4000,
      });
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

  const getControllerStatusData = async () => {
    // setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("token");
      const id = boxId;
      const resp = await axios.get(`${baseURL}sladm/getcontrollerstatusformobile/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },

        timeout: 4000,
      });
      // setTimeout(() => {
      // setData(resp.data.result);
      // setLoading(false);

      setCurrentBoxStatus(resp.data.result.currentStatus.name);
      // }, 600);
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getControllerStatusData();
    }
    return () => {
      isMounted = false;
    };
  }, [schemaTrigger]);

  useEffect(() => {
    let isMounted = true;

    let rotationInterval = setInterval(() => {
      if (isMounted) {
        setSchemaTrigger(!schemaTrigger);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(rotationInterval);
    };
  });

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 10, marginLeft: 10, marginTop: 20 }}>
        <Div bg="white" shadow="sm" rounded="xl" w="70%" h={150} p={10} pl={20} flexDir="column" justifyContent="space-between">
          {/* <Div m={15}> */}
          <Text color="black" fontSize="3xl" fontWeight="bold">
            Бокс: {boxName}
          </Text>
          <Text color="black" fontSize="xl" fontWeight="bold">
            {unitName}
          </Text>
          <Text color="black" fontSize="xl">
            {floorName}
          </Text>
          <Text color="black" fontSize="xl">
            Размер: {size} {sizeType}
          </Text>
          {/* </Div> */}
        </Div>

        <Button
          onPress={() => {
            openDoor();
            playAnimation();

            setTimeout(() => {
              resetAnimation();
            }, 2000);
          }}
          bg="white"
          shadow="sm"
          rounded="xl"
          w="25%"
          // h={windowHeight / 5}
          h={150}
        >
          <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <LottieView
              source={require("../../Images/lottie.json")}
              style={{ width: 100 }}
              resizeMode="contain"
              autoPlay={false}
              ref={homeAnimation}
              progress={0}
              loop={false}
            />
            <Text fontWeight="bold">Открыть</Text>
          </View>
        </Button>
      </View>
      <Div h={60} m={10} mt={20} shadow="sm" rounded="xl" bg="white">
        <Div flexDir="row" justifyContent="space-between" m={15} ml={20}>
          <Text fontSize="xl" fontWeight="bold">
            Текущее состояние:
          </Text>
          {/* <Text fontSize="xl" fontWeight="bold"> */}
          <Badge fontSize="md" bg={currentBoxStatus === "Открыт" ? "orange700" : "green900"}>
            {currentBoxStatus}
          </Badge>
          {/* </Text> */}
        </Div>
      </Div>
      {/* <Div> */}
      <Collapse defaultActive={true} m={10} shadow="sm" rounded="xl" mb={120}>
        <Collapse.Header bg="#004680" h={60}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            Договор: {contractName}
          </Text>
        </Collapse.Header>
        <Collapse.Body pb="xl">
          <Text fontSize="xl">Срок действия:</Text>
          <Text fontSize="xl" fontWeight="bold" mt={10}>
            С {dayjs(startDate).locale("ru").format("DD MMMM YYYY")} по {dayjs(finishDate).locale("ru").format("DD MMMM YYYY")}
          </Text>
          <Text fontSize="xl" mt={10}>
            Тариф: {dayTariff} руб/день
          </Text>
          <Text fontSize="xl" mt={10}>
            Оплачен до: {dayjs(paidBefore).locale("ru").format("DD MMMM YYYY")}{" "}
          </Text>
        </Collapse.Body>
      </Collapse>

      {/* <Text fontSize="4xl" fontWeight="bold">
          Договор: {contractName}
        </Text>
        <Text fontSize="2xl">Срок действия:</Text>
        <Text fontSize="2xl" fontWeight="bold">
          С {dayjs(startDate).locale("ru").format("DD MMMM YYYY")} по {dayjs(finishDate).locale("ru").format("DD MMMM YYYY")}
        </Text> */}
      {/* </Div> */}
    </ScrollView>
  );
});

export default BoxDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
