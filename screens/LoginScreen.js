import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import firebase from "firebase";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState({
    password: "",
    passwordLength: false,
    showPasswordEntry: false,
  });
  const [email, SetCheckEmail] = useState({
    email: "",
    validateEmail: false,
    emailCorrect: false,
  });

  const checkPassword = (val) => {
    if (val.length > 8 || val.length === 0) {
      setShowPassword({
        password: val,
        passwordLength: false,
        showPasswordEntry: false,
      });
    } else {
      setShowPassword({
        password: val,
        passwordLength: true,
        showPasswordEntry: false,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword({
      ...showPassword,
      showPasswordEntry: !showPassword.showPasswordEntry,
    });
  };

  const checkEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (val.length !== 0) {
      if (reg.test(val) === false) {
        SetCheckEmail({
          email: val,
          validateEmail: true,
          emailCorrect: false,
        });
      } else {
        SetCheckEmail({
          email: val,
          validateEmail: true,
          emailCorrect: true,
        });
      }
    } else {
      SetCheckEmail({
        email: "",
        validateEmail: false,
        emailCorrect: false,
      });
    }
  };

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.email, showPassword.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Stairway to Food Heaven</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={Colors.darkAccent} size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkEmail(val)}
            value={email.email}
          />

          {email.validateEmail && email.emailCorrect ? (
            <Feather name="check-circle" color={Colors.success} size={20} />
          ) : email.validateEmail ? (
            <Feather name="x-circle" color={Colors.danger} size={20} />
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 40 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={Colors.darkAccent} size={20} />
          <TextInput
            secureTextEntry={!showPassword.showPasswordEntry}
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkPassword(val)}
            value={showPassword.password}
          />
          <TouchableOpacity onPress={() => toggleShowPassword()}>
            {!showPassword.showPasswordEntry ? (
              <Feather name="eye-off" color={Colors.lightAccent} size={20} />
            ) : (
              <Feather name="eye" color={Colors.lightAccent} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {!showPassword.passwordLength ? null : (
          <Text style={{ color: Colors.danger }}>
            Password should be 8 characters long!
          </Text>
        )}
        <View style={styles.button}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => onLogin()}>
            <LinearGradient
              colors={[Colors.darkAccent, Colors.lightAccent]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
            style={[
              styles.signIn,
              {
                borderColor: Colors.lightAccent,
                borderWidth: 2,
                marginTop: 15,
                width: "50%",
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: Colors.darkAccent,
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.darkShade,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: Colors.lightShade,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: Colors.lightShade,
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: Colors.darkShade,
    fontWeight: "bold",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightAccent,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.danger,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: Colors.lightAccent,
    fontWeight: "bold",
  },
  errorMsg: {
    color: Colors.danger,
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.lightShade,
  },
});
