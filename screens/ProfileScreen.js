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
          <View style={{ alignSelf: "center" }}>
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
                name="ios-add"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 2, marginLeft: -2 }}
              ></Ionicons>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {name}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {email}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginTop: -300,
          marginBottom: 20,
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <Button title="Logout" onPress={onLogout} color={Colors.danger} />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: -300 }}>
        <FlatList
          numColumns={3}
          data={posts}
          keyExtractor={(item) => item.downloadURL}
          renderItem={({ item }) => (
            // <TouchableOpacity onPress={() => this.goToPost(item)}>
            <Image
              source={{ uri: item.downloadURL }}
              style={{ width: 130, height: 100 }}
            />
            // </TouchableOpacity>
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
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: Colors.warning,
  },
  active: {
    backgroundColor: Colors.success,
    position: "absolute",
    bottom: 20,
    left: 4,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
});
