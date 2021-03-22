import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { AppearanceProvider } from "react-native-appearance";

import firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./navigation/MainScreen";
import RecipeIngredient from "./components/RecipeIngredient";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
        });
      } else {
        this.setState({
          loggedIn: true,
        });
      }
    });
  }

  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <AppearanceProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppearanceProvider>
      );
    } else {
      return (
        // <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainScreen" headerMode="none">
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen
              name="RecipeIngredient"
              component={RecipeIngredient}
            />
          </Stack.Navigator>
        </NavigationContainer>
        // </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({});

export default App;
