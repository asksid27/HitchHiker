import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPosts } from "../redux/actions/index";

const Tab = createMaterialBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import PostScreen from "../screens/PostScreen";
import RecipesScreen from "../screens/RecipesScreen";
import ProfileScreen from "../screens/ProfileScreen";

import Colors from "../constants/Colors";

class MainScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <Tab.Navigator
        activeColor={Colors.lightShade}
        inactiveColor={Colors.darkShade}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="home" color={Colors.lightShade} size={22} />
            ),
            tabBarColor: Colors.primary,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons
                name="food-bank"
                color={Colors.lightShade}
                size={22}
              />
            ),
            tabBarColor: Colors.darkShade,
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="plus" color={Colors.lightShade} size={22} />
            ),
            tabBarColor: Colors.success,
          }}
        />
        <Tab.Screen
          name="Recipes"
          component={RecipesScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: () => (
              <MaterialIcons
                name="fastfood"
                color={Colors.lightShade}
                size={22}
              />
            ),
            tabBarColor: Colors.danger,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="user" color={Colors.lightShade} size={22} />
            ),
            tabBarColor: Colors.warning,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchPosts }, dispatch);

export default connect(null, mapDispatchProps)(MainScreen);
