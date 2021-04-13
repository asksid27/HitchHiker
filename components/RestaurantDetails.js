import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

function RestaurantDetails(props) {
    const item = props.route.params.item
    return (
        <View style={styles.container} >
            <Text style={styles.test} >
                RESTAURANT DETAILS
                {item?.name}
            </Text>
        </View>
    )
}

export default RestaurantDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', },
    test: { textAlign: 'center' }
})
