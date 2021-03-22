import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";

import firebase from "firebase";

import Colors from "../constants/Colors";

export default function Post(props) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const verifyPermission = async () => {
    const result = await Permission.askAsync(
      Permission.CAMERA,
      Permission.MEDIA_LIBRARY
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Camera Permission Required",
        "You need to grant permission to access camera to provide photos",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const imageUri = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!imageUri.cancelled) setImage(imageUri.uri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setImageUpload(false);
        setCaption("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = async () => {
    setImageUpload(true);
    const response = await fetch(image);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <View style={styles.text}>
            <Text>Pick an Image!</Text>
          </View>
        ) : !imageUpload ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <ActivityIndicator size="large" color={Colors.success} />
        )}
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Take Image"
            color={Colors.success}
            onPress={takeImageHandler}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Go To Gallery"
            color={Colors.success}
            onPress={pickImage}
          />
        </View>
      </View>
      {image ? (
        <View style={styles.save}>
          <TextInput
            placeholder="Caption"
            onChangeText={(caption) => setCaption(caption)}
            value={caption}
            style={styles.inputText}
          />
          <View style={styles.but}>
            <Button
              title="Save"
              color={Colors.primary}
              onPress={() => uploadImage()}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.darkShade,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 20,
  },
  but: {
    justifyContent: "center",
    width: "20%",
    marginRight: 25,
    marginTop: 40,
  },
  save: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputText: {
    borderBottomColor: Colors.lightAccent,
    borderBottomWidth: 2,
    height: 50,
    width: "80%",
    textAlign: "center",
  },
});
