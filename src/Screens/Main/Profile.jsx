import React, { Component } from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Акции и предложения</Text>
      <Swiper style={styles.wrapper} horizontal={false} autoplay>
        {/* <View style={styles.slide}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/1.jpg")} />
        </View>
        <View style={styles.slide}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/2.jpg")} />
        </View> */}
        <View style={styles.slide}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/7.jpg")} />
        </View>
        <View style={styles.slide}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/6.jpg")} />
        </View>
      </Swiper>

      {/* <Swiper
        style={styles.wrapper}
        height={240}
        // onMomentumScrollEnd={(e, state, context) => console.log("index:", state.index)}
        dot={
          <View
            style={{
              backgroundColor: "rgba(0,0,0,.2)",
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#000",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        paginationStyle={{
          bottom: -23,
          left: null,
          right: 10,
        }}
        loop
      >
        <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/1.jpg")} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/2.jpg")} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/3.jpg")} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
          <Image resizeMode="stretch" style={styles.image} source={require("../../Images/4.jpg")} />
        </View>
      </Swiper> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 5,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },

  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width,
    flex: 1,
  },
});
