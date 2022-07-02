import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNames } from "../../../../navigation/constants";

interface RestaurantCardProps {
  item: {
    title: string;
    image: string;
    distance: string;
  };
}

const RestaurantCard = ({ item }: RestaurantCardProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={item.title}
      onPress={() => navigation.navigate(RootScreenNames.RestaurantMenuScreen)}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/sushi_restaurant_cover.jpeg")}
            resizeMode={"cover"}
          />
          <View style={styles.textContainer}>
            <Text>{item.title}</Text>
            <Text>{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  container: {
    flex: 1,
  },
  image: {
    width: 350,
    height: 200,
  },
  textContainer: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default RestaurantCard;
