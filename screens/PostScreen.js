import React from "react";
import { View, Text, StyleSheet } from "react-native";

import LocationPicker from "../components/LocationPicker";
import Post from "../components/Post";

export default function PostScreen() {
  // const [camera];

  return (
    <View style={styles.container}>
      <Post />
      <LocationPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
});
