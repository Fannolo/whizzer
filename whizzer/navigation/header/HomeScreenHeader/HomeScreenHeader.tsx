import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";

const HomeScreenHeader = (): JSX.Element => {
  const [location, setLocation] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const recoverCurrentPosition = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let locationString = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocation(
      `${locationString[0].street} ${locationString[0].streetNumber}, ${locationString[0].city}`
    );
  }, []);

  useEffect(() => {
    recoverCurrentPosition();
  }, [recoverCurrentPosition]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  return (
    <View>
      <Text style={styles.mapTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreenHeader;
