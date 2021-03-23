import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";

import Colors from "../constants/Colors";

const LocationPicker = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Location Permission Required",
        "You need to grant permission to access location",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getUserLocation = async () => {
    const hasPermission = await verifyPermission();
    if (hasPermission) {
      try {
        setIsFetching(true);
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000,
        });
        console.log(location);
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (err) {
        Alert.alert("Could not fetch Location", "Please Try Again", [
          { text: "Okay" },
        ]);
      }
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.success} />
        ) : userLocation ? (
          <MapView
            style={styles.map}
            showsUserLocation={true}
            rotateEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled
            region={{
              latitude: userLocation.lat,
              longitude: userLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // onUserLocationChange={()=>onUserLocationChange()}
          />
        ) : (
          <Text>Your location!</Text>
        )}
      </View>
      <View style={{ width: "50%", justifyContent: "center" }}>
        <Button
          title="Get Location"
          color={Colors.lightAccent}
          onPress={getUserLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginTop: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPreview: {
    marginBottom: 15,
    width: "100%",
    height: 250,
    borderColor: Colors.lightAccent,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
