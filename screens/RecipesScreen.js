import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import Recipe from "../components/Recipe";
import Colors from "../constants/Colors";

import * as Recipes from "../data/dummy-data";

export default function RecipesScreen(props) {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={Recipes.recipes.results}
        renderItem={(itemdata) => {
          return <Recipe item={itemdata.item} navigation={props.navigation} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  imageContainer: {
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
