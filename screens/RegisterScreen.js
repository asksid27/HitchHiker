import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import firebase from "firebase";

const RegisterScreen = () => {
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
  const [name, SetName] = useState({
    name: "",
    correctCharacters: false,
  });

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.email, showPassword.password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name: name.name,
            email: email.email,
          });
      })
      .catch((error) => {});
  };

  const checkName = (val) => {
    if (val.length === 0) {
      SetName({
        name: "",
        correctCharacters: false,
      });
    } else {
      let reg = /^[a-zA-Z ]{2,40}$/;
      if (reg.test(val) === false) {
        SetName({
          name: val,
          correctCharacters: false,
        });
      } else {
        SetName({
          name: val,
          correctCharacters: true,
        });
      }
    }
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Let's Begin!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <FontAwesome name="heart-o" color={Colors.darkAccent} size={20} />
          <TextInput
            placeholder="Your Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkName(val)}
            value={name.name}
          />

          {name.correctCharacters ? (
            <Feather name="check-circle" color={Colors.success} size={20} />
          ) : (
            <Feather name="x-circle" color={Colors.danger} size={20} />
          )}
        </View>
        <Text style={[styles.text_footer, { marginTop: 40 }]}>Email</Text>
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
        <View
          elevation={5}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => onSignUp()}
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

export default RegisterScreen;

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
    flex: 5,
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
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
  },
});
