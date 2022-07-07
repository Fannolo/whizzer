import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNames } from "../../../../navigation/constants";
import { Restaurant } from "../../../../utils/types";

interface RestaurantCardProps {
  item: Restaurant & { image: string };
}

const RestaurantCard = ({ item }: RestaurantCardProps) => {
  const navigation = useNavigation();

  const handleNavigation = () =>
    navigation.navigate(RootScreenNames.RestaurantMenuScreen);

  return (
    <View key={item.id} style={styles.container}>
      <TouchableOpacity onPress={handleNavigation}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/sushi_restaurant_cover.jpeg")}
            resizeMode={"cover"}
          />
          <View style={styles.textContainer}>
            <Text>{item.name}</Text>
            <Text>69km</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
