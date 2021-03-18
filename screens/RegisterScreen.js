import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/colors";
import colors from "../constants/colors";

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
          <FontAwesome
            name="heart-o"
            color="rgba(256, 256, 256, 0.6)"
            size={20}
          />
          <TextInput
            placeholder="Your Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkName(val)}
            value={name.name}
          />

          {name.correctCharacters ? (
            <Feather name="check-circle" color="#03DAC5" size={20} />
          ) : (
            <Feather name="x-circle" color="#CF6679" size={20} />
          )}
        </View>
        <Text style={[styles.text_footer, { marginTop: 40 }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="rgba(256, 256, 256, 0.6)"
            size={20}
          />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => checkEmail(val)}
            value={email.email}
          />

          {email.validateEmail && email.emailCorrect ? (
            <Feather name="check-circle" color="#03DAC5" size={20} />
          ) : email.validateEmail ? (
            <Feather name="x-circle" color="#CF6679" size={20} />
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 40 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="rgba(256, 256, 256, 0.6)" size={20} />
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
              <Feather
                name="eye-off"
                color="rgba(256, 256, 256, 0.4)"
                size={20}
              />
            ) : (
              <Feather name="eye" color="rgba(256, 256, 256, 0.4)" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {!showPassword.passwordLength ? null : (
          <Text style={{ color: "#CF6679" }}>
            Password should be 8 characters long!
          </Text>
        )}
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
            style={[
              styles.signIn,
              {
                borderColor: Colors.secondary,
                borderWidth: 1,
                marginTop: 15,
                width: "50%",
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: Colors.secondary,
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
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "white",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#fff",
  },
  errorMsg: {
    color: "#FF0000",
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
  },
});
