import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import baseURL from "../../Helpers/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TouchableOpacity, Platform, StyleSheet, StatusBar, Alert, Image, Dimensions, ActivityIndicator } from "react-native";
import { Input, Icon, Text, Button, Checkbox, Toggle } from "react-native-magnus";
import { observer } from "mobx-react-lite";
import { globalContext } from "../../Store/GlobalStore";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = observer(({ navigation }) => {
  const store = useContext(globalContext);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSecurePassw, setIsSecurePassw] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isRememberPassw, setIsRememberPassw] = useState(false);

  const loginAttemption = async () => {
    setError(false);
    setLoading(true);
    const loginClient = {
      telephone: telephone,
      password: password,
    };

    try {
      const resp = await axios.post(`${baseURL}slman/clientmobilelogin`, loginClient, { timeout: 4000 });
      await AsyncStorage.setItem("telephone", telephone);
      await AsyncStorage.setItem("clientId", resp.data.clientId);
      await AsyncStorage.setItem("token", resp.data.token);

      if (isRememberPassw) {
        await AsyncStorage.setItem("password", password);
      }

      setTimeout(() => {
        setLoading(false);
        store.setLogin();
      }, 1000);

      // console.log(resp.data);
    } catch (error) {
      if (error.response) {
        // console.log("2");
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }, 1000);

        // setErrorForHandling(error.response.data.message);
      } else if (error.request) {
        console.log("3");
      } else {
        console.log("4");
      }
    }
  };

  const cleanAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("password");
    } catch (error) {}
  };

  useEffect(() => {
    async function checkpwd() {
      const pass = await AsyncStorage.getItem("password");
      if (pass !== null) {
        const tel = await AsyncStorage.getItem("telephone");
        setTelephone(tel);
        setPassword(pass);
        setIsRememberPassw(true);
      }
    }
    checkpwd();
  }, []);

  return (
    <View style={styles.wrapperContainer}>
      <Spinner visible={isLoading} textContent={"Загрузка..."} color="#004680" animation="fade" overlayColor="rgba(255, 255, 255, 1)" />
      {/* <View style={styles.topContainer}> */}
      {isHeaderVisible ? (
        <LinearGradient colors={["#004680", "#3c8cd2"]} style={styles.topContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.centerContainer}>
            <Image style={styles.logo} source={require("../../Images/boxLockLogoPng.png")} />
          </View>
        </LinearGradient>
      ) : null}

      {/* </View> */}
      <View style={{ marginTop: isHeaderVisible ? 20 : 50, ...styles.mainContainer }}>
        <Text fontSize="6xl" fontWeight="bold">
          Вход
        </Text>
        <Input
          placeholder="Номер телефона"
          mt={20}
          p={10}
          shadow="sm"
          h={60}
          rounded="circle"
          fontSize="2xl"
          fontWeight="bold"
          value={telephone}
          onChange={() => {
            setIsHeaderVisible(false);
          }}
          onEndEditing={() => {
            setIsHeaderVisible(true);
          }}
          // keyboardType="phone-pad"
          borderColor="#ffffff"
          onChangeText={(text) => setTelephone(text)}
          prefix={<Icon name="phone" color="gray900" fontFamily="AntDesign" fontSize="4xl" mr={10} />}
        />
        <Input
          placeholder="Пароль"
          mt={20}
          p={10}
          shadow="sm"
          h={60}
          value={password}
          secureTextEntry={isSecurePassw}
          rounded="circle"
          fontSize="2xl"
          fontWeight="bold"
          borderColor="#ffffff"
          onChangeText={(text) => setPassword(text)}
          onChange={() => {
            setIsHeaderVisible(false);
          }}
          onEndEditing={() => {
            setIsHeaderVisible(true);
          }}
          prefix={<Icon name="ios-key-outline" color="gray900" fontFamily="Ionicons" fontSize="4xl" mr={10} />}
          suffix={
            <TouchableOpacity
              onPress={() => {
                setIsSecurePassw(!isSecurePassw);
              }}
            >
              <Icon name={isSecurePassw ? "eye-outline" : "eye-off-outline"} color="gray900" fontFamily="Ionicons" fontSize="4xl" mr={10} />
            </TouchableOpacity>
          }
        />
        <View style={styles.forgotPassw}>
          <View style={{ flexDirection: "row" }}>
            <Toggle
              on={isRememberPassw}
              onPress={({ on }) => {
                setIsRememberPassw(!isRememberPassw);
                if (!on) {
                  cleanAsyncStorage();
                }
              }}
              bg="gray500"
              circleBg="white"
              activeBg="blue700"
              h={30}
              w={60}
            />
            <Text ml={10} fontSize="lg" fontWeight="bold">
              Запомнить
            </Text>
          </View>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("PasswordRecovery");
          // }}
          >
            <Text fontSize="lg" fontWeight="bold">
              Забыли пароль?
            </Text>
          </TouchableOpacity>
        </View>

        {isError ? (
          <View style={styles.validationTextBlock}>
            <Text fontSize="lg" color="#e65500" fontWeight="bold">
              Проверьте введенные данные!
            </Text>
          </View>
        ) : null}

        <View style={styles.mainButton}>
          <Button
            mt={20}
            pl={50}
            // h={60}
            rounded="circle"
            fontSize="4xl"
            fontWeight="bold"
            shadow="sm"
            bg="#e65500"
            color="white"
            suffix={<Icon name="arrowright" ml={20} color="white" fontSize="4xl" />}
            onPress={() => loginAttemption()}
          >
            Войти
          </Button>
        </View>
      </View>
      {/* <View style={styles.bottomText}>
        <View style={styles.textConn}>
          <Text fontSize="xl">Забыли пароль? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PasswordRecovery");
            }}
          >
            <Text fontSize="xl" fontWeight="bold">
              Восстановить
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
});

export default Login;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
  },
  topContainer: {
    marginTop: -20,
    backgroundColor: "#004680",
    width: "100%",
    height: windowHeight / 4,
    borderRadius: 20,
  },
  logo: {
    marginTop: windowHeight / 8,
    width: windowWidth / 2,
    resizeMode: "contain",
    height: 60,
    alignSelf: "center",
  },
  textInput: {
    margin: 20,
    height: windowHeight / 12,
    // borderWidth: 1,
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  mainContainer: {
    margin: 20,
  },
  mainButton: {
    alignSelf: "flex-end",
  },
  bottomText: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginBottom: 60,
  },
  wrapperContainer: {
    flex: 1,
  },
  textConn: {
    flexDirection: "row",
  },
  validationTextBlock: {
    alignItems: "center",
    marginTop: 15,
  },
  forgotPassw: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
