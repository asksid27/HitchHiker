import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";

export default function Recipe(props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {props.item.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.danger,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    height: 320,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    marginVertical: 4,
    fontSize: 14,
    paddingHorizontal: 5,
    color: Colors.lightShade,
  },
  image: {
    height: 300,
    width: "100%",
  },
});
