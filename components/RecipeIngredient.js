import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

export default function RecipeIngredient(props) {
  const [ingredients, setIngredients] = useState(null);
  console.log(props.route.params);
  const getIngredients = async () => {
    const result = await fetch(
      `https://api.spoonacular.com/recipes/${props.route.params.item.id}/ingredientWidget.json?apiKey=2f9b5e165ec84cd99805e21b807aa778`
    );
    const temp = await result.json();
    setIngredients(temp.ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, [props]);

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.name}
        data={ingredients}
        numColumns={2}
        renderItem={(itemdata) => (
          <Image
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_100x100/${itemdata.item.image}`,
            }}
            style={styles.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
