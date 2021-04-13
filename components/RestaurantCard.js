import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Rating } from 'react-native-ratings';

const photoURL = "https://i1.wp.com/roadsandkingdoms.com/uploads/2018/03/3-Bombay-Bhelpuri-7.jpg?w=2400&quality=95&strip=color&ssl=1"

export default function Restaurant(props) {
    const restaurantHandle = () => {
        props.navigation.navigate("RestaurantDetails", { item: props.item });
    };

    return (
        <TouchableOpacity
            onPress={() => restaurantHandle()}
            style={styles.container}
        >
            <Text style={styles.title} numberOfLines={1}>
                {props.item.name}{' ( ' + props.item.cuisines + ' )'}
            </Text>
            <Image
                source={{ uri: (props?.item?.thumb || photoURL) }}
                style={styles.image} />
            <Rating
                type='custom'
                ratingCount={5}
                readonly
                startingValue={props.item.user_rating.aggregate_rating}
                imageSize={30}
                tintColor={Colors.primary}
            />
            <Text style={styles.title} > {props.item.location.address} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { shadowColor: Colors.danger, shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 10, borderRadius: 10, backgroundColor: Colors.primary, height: 330, margin: 10, justifyContent: "center", alignItems: "center", overflow: "hidden", },
    title: { marginVertical: 4, fontSize: 14, paddingHorizontal: 5, color: Colors.lightShade, },
    image: { height: 250, width: "100%", },
});
