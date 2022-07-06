import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useSupabaseHelpers from "../../../../hooks/useSupabaseCollection";
import { supabase } from "../../../../utils/supabase";
import { Dish } from "../../../../utils/types";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";
import { RootStackScreenProps } from "../../../../types";
import { RootScreenNames } from "../../../../navigation/constants";

const ITEM_HEIGHT = 150;

type RestaurantMenuScreenProps =
  RootStackScreenProps<RootScreenNames.RestaurantMenuScreen>;

const RestaurantMenuScreen: React.FC<RestaurantMenuScreenProps> = ({
  navigation,
  route,
}) => {
  const { restaurantId } = route.params;

  const { data, isLoading, error } = useSupabaseHelpers(
    supabase
      .from<Dish>("dishes")
      .select()
      .filter("restaurant_id", "in", `(${restaurantId})`) // TODO: check is condition
      .throwOnError(true)
  );

  const dishes =
    data?.map((dish) => ({
      ...dish,
      imageURL: supabase.storage
        .from("food-images")
        .getPublicUrl(`${restaurantId}/${dish.code}.jpg`).data?.publicURL,
    })) ?? [];

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const sectionListRef = useRef<SectionList<Dish>>(null);

  const dishesByCategory =
    dishes?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.kind]: [...(acc[curr.kind] ?? []), curr],
      }),
      {} as Record<string, Dish[]>
    ) ?? {};

  const sections = Object.entries(dishesByCategory).map(([key, value]) => ({
    title: key,
    data: value,
  }));

  const sectionNames = Object.keys(dishesByCategory);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      const sectionIndex = sectionNames.findIndex(
        (name) => name === selectedCategory
      );

      sectionListRef.current?.scrollToLocation({ sectionIndex, itemIndex: 0 });
    }
  }, [selectedCategory]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>ERROR</Text>;
  }

  return (
    <View style={styles.container}>
      <CategoriesSlider
        categories={sectionNames}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <SectionList
        sections={sections}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ height: ITEM_HEIGHT }}
            onPress={() => {
              navigation.navigate(RootScreenNames.DishDetailScreen, {
                dish: item,
              });
            }}
          >
            <View style={styles.dishListItem}>
              <View style={styles.textContainer}>
                <Text style={styles.bold}>{item.item}</Text>
                <Text style={styles.priceText}>{`${item.price}$`}</Text>
                <Text style={{ color: "grey" }}>{`${item.ingredients}`}</Text>
              </View>
              <Image style={styles.foodImage} source={{ uri: item.imageURL }} />
            </View>
          </TouchableOpacity>
        )}
        style={styles.container}
        ref={sectionListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  chipContainer: {
    paddingVertical: 8,
  },
  sectionHeader: {
    backgroundColor: "white",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dishListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  foodImage: {
    width: 100,
    height: 100,
  },
  priceText: {
    fontWeight: "400",
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
});

export default RestaurantMenuScreen;
