import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React from "react";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import Carousel from "../../common/components/Carousel/Carousel";

const HomeScreen = () => {
  const dataTest = [
    {
      image: "../../../assets/images/sushi_restaurant_cover.jpeg",
      title: "Sushiamelo",
      distance: "2,6km",
    },
    {
      image: "../../../assets/images/sushi_restaurant_cover.jpeg",
      title: "Sushiamelo",
      distance: "2,6km",
    },
    {
      image: "../../../assets/images/sushi_restaurant_cover.jpeg",
      title: "Sushiamelo",
      distance: "2,6km",
    },
    {
      image: "../../../assets/images/sushi_restaurant_cover.jpeg",
      title: "Sushiamelo",
      distance: "2,6km",
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{}}>
        <Text>Recommended</Text>
      </View>
      <Carousel
        data={dataTest}
        showsHorizontalScrollIndicator={false}
        Component={RestaurantCard}
      />
      <Text>HomeScreen</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
