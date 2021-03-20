import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";

import Colors from "../constants/Colors";
import AppLoading from "expo-app-loading";
const SplashScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          colorScheme === "light" ? Colors.darkShade : Colors.primary,
      }}
    >
      <View style={styles.header}>
        <Animatable.Image
          animation="tada"
          duraton="3000"
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={{
          ...styles.footer,
          backgroundColor:
            colorScheme === "light" ? Colors.lightShade : Colors.darkShade,
        }}
        animation="fadeInUpBig"
      >
        <Text
          style={{
            ...styles.title,
            color:
              colorScheme === "dark" ? Colors.lightShade : Colors.darkShade,
          }}
        >
          Increase Your Appetite
        </Text>
        <Text
          style={{
            ...styles.text,
            color:
              colorScheme === "light" ? Colors.primary : Colors.lightAccent,
          }}
        >
          Sign in with account
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <LinearGradient
              colors={[Colors.darkAccent, Colors.lightAccent]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons
                name="navigate-next"
                color={Colors.lightShade}
                size={20}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: Colors.lightShade,
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
});

export default SplashScreen;
