import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import Carousel from "../../common/components/Carousel/Carousel";
import useSupabaseHelpers from "../../../hooks/useSupabaseCollection";
import { Restaurant } from "../../../utils/types";
import { supabase } from "../../../utils/supabase";

const HomeScreen = () => {
  const { data, error, isLoading } = useSupabaseHelpers(
    supabase.from<Restaurant>("restaurants").select().throwOnError(true)
  );

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  
  if (error) {
    return <Text>ERROR</Text>
  }

  const dataTest = data?.map(restaurant => ({
    ...restaurant,
    image: "../../../assets/images/sushi_restaurant_cover.jpeg",
  })) ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Recommended</Text>
        <Carousel
          data={dataTest}
          showsHorizontalScrollIndicator={false}
          Component={RestaurantCard}
        />
      </View>
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
