import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

const RecipeCard = ({ item }) => {
    console.log(item);

    return (
        <View style={styles.container} >
            <View style={styles.recipeCard} >
                <TouchableOpacity style={{ paddingTop: hp('2%'), marginBottom: hp('-1%') }} >
                    <Image style={styles.postImage} source={{
                        uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.item.image}`,
                    }}
                    />
                    <View style={styles.userInfoText} >
                        <Text style={styles.userName} >
                            {item.item.name}{' - '}
                            {item.item.amount.metric.value}{' '}{item.item.amount.metric.unit}
                        </Text>
                        <Text style={styles.postTime} >
                            {/* {moment(item.postTime.toDate()).fromNow()} */}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RecipeCard;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', padding: wp('1%') },
    recipeCard: { backgroundColor: '#f8f8f8', width: wp('50%'), borderRadius: wp(5), },
    userName: { fontSize: hp('1.5%'), fontWeight: 'bold', color: 'black', },
    userInfoText: { flexDirection: 'column', justifyContent: 'center', marginLeft: wp(2), alignItems: 'center' },
    postImage: { width: wp('45%'), height: wp('40%'), resizeMode: 'contain', borderRadius: wp('2%'), },
});