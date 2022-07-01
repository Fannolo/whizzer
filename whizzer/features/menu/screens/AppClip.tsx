import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {};

const AppClip = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppClip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default AppClip;
