import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Restaurant from "../components/RestaurantCard";
import Colors from "../constants/Colors";
import * as Restaurants from "../data/vnsPatna1";

export default function SearchScreen(props) {
	return (
		<View style={styles.container}>
			<FlatList
				keyExtractor={(item) => item.restaurant.id.toString()}
				data={Restaurants.restaurants.vnsPatna}
				renderItem={(itemdata) => {
					return <Restaurant item={itemdata.item.restaurant}
						navigation={props.navigation}
					/>;
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 50, },
	imageContainer: { shadowColor: Colors.danger, shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 10, borderRadius: 10, backgroundColor: Colors.primary, height: 320, margin: 10, justifyContent: "center", alignItems: "center", overflow: "hidden", },
	title: { marginVertical: 4, fontSize: 14, paddingHorizontal: 5, color: Colors.lightShade, },
	image: { height: 300, width: "100%", },
});
