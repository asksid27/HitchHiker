import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import RecipeCard from '../components/RecipeCard';

export default function RecipeIngredient(props) {
	const [ingredients, setIngredients] = useState(null);
	console.log(props.route.params);
	const getIngredients = async () => {
		const result = await fetch(
			`https://api.spoonacular.com/recipes/${props.route.params.item.id}/ingredientWidget.json?apiKey=2f9b5e165ec84cd99805e21b807aa778`
		);
		const temp = await result.json();
		console.log(temp);
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
					<View>
						<RecipeCard
							item={itemdata}
						/>
					</View>
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