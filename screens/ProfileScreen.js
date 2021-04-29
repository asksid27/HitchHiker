import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import firebase from "firebase";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import {widthPercentageToDP as wp ,  heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ProfileScreen(props) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data().image) {
          setImage(snapshot.data().image);
        }
        setName(snapshot.data().name);
        setEmail(snapshot.data().email);
      });

    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setPosts(documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddProfileImage");
          }}
        >
          <View style={{ alignSelf: "center", flexDirection:'row', marginTop: 20, marginBottom:30,}}>
            <View>  
              <View style={styles.profileImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="center"
                  />
                ) : null}
              </View>
              <View style={styles.active}></View>
              <View style={styles.add}>
                <Ionicons
                  name="ios-add-circle-sharp"
                  size={45}
                  color="black"
                ></Ionicons>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 20 }]}>
                {name}
              </Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]}>
                {email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={[styles.statsBox, {
                borderLeftWidth: 1,                
              },]}>
            <Text style={[styles.text, { fontSize: 20,  }]}>{posts.length}</Text>
            <Text style={styles.text, styles.subText}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 20 }]}>4</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={[
              styles.statsBox,
              {
                borderRightWidth: 1,
              },
            ]}>
            <Text style={[styles.text, { fontSize: 20,}]}>3</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>
      </ScrollView>
        <View
          style={{
            marginTop: 0,
            marginBottom: 15,
            flex: 0,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%",
          }}>
            <Button title="Logout" onPress={onLogout} color={Colors.danger}/>
          </View>
        </View>

        <View style={{ flexBasis: 390, }}>
          <FlatList
            numColumns={3}
            data={posts}
            keyExtractor={(item) => item.downloadURL}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.downloadURL }}
                style={{ width: 120, height: 120 }}
              />
            )}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 30,

  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: 150,
    width: 200,
    resizeMode:'cover',
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    marginRight:10,
    width: 120,
    height: 120,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: "orange",
  },
  active: {
    backgroundColor: Colors.success,
    position: "absolute",
    top: 30,
    left: 35,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft:-30,
    marginTop:-20,
  },
  add: {
    position: "absolute",
    bottom: -7,
    right: -7,
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
    borderColor: "grey",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 6,
  },
});
