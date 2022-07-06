import { View, Dimensions, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import useSupabaseHelpers from "../../../../hooks/useSupabaseCollection";
import { supabase } from "../../../../utils/supabase";
import { Restaurant } from "../../../../utils/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../../../types";
import { RootScreenNames } from "../../../../navigation/constants";

const MapScreen = ({ 
  navigation 
}: BottomTabScreenProps<RootTabParamList, RootScreenNames.Map>): JSX.Element => {
  const { data, error, isLoading } = useSupabaseHelpers(
    supabase.from<Restaurant>("restaurants").select().throwOnError(true)
  );

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  
  if (error) {
    return <Text>ERROR</Text>
  }

  const locations = data?.flatMap(restaurant => 
    restaurant.locations.map(coords => ({
      restaurantId: restaurant.id,
      latitude: coords.lat,
      longitude: coords.long,
    }))
  )

  const handleSelectRestaurant = (restaurantId: Restaurant["id"]) => () => {
    navigation.navigate(RootScreenNames.RestaurantMenuScreen, { restaurantId });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {locations?.map(({restaurantId, ...loc}) => (
          <Marker 
            key={`${restaurantId}-${JSON.stringify(loc)}`}
            coordinate={loc}
            onPress={handleSelectRestaurant(restaurantId)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
