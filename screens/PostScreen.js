import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Post from "../components/Post";

export default function PostScreen() {
  // const [camera];

  return (
    <View style={styles.container}>
      <Post />
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
