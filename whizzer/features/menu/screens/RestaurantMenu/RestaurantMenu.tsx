import { View, Text, ScrollView, FlatList, StyleSheet, SectionList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useSupabaseHelpers from "../../../../hooks/useSupabaseCollection";
import { supabase } from "../../../../utils/supabase";
import { Dish } from "../../../../utils/types";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../../../types";
import { RootScreenNames } from "../../../../navigation/constants";

type RestaurantMenuScreenProps = RootStackScreenProps<RootScreenNames.RestaurantMenuScreen>;

const RestaurantMenuScreen: React.FC<RestaurantMenuScreenProps> = ({ navigation }) => {
  const { data, isLoading, error } = useSupabaseHelpers(
    supabase.from<Dish>("dishes").select().throwOnError(true),
  );

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const sectionListRef = useRef<SectionList<Dish>>(null);

  const dishesByCategory = data?.reduce((acc, curr) => ({
    ...acc,
    [curr.kind]: [...(acc[curr.kind] ?? []), curr]
  }), {} as Record<string, Dish[]>) ?? {};

  const sections = Object.entries(dishesByCategory)
    .map(([key, value]) => ({ title: key, data: value })); 

  const sectionNames = Object.keys(dishesByCategory);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      const sectionIndex = sectionNames.findIndex((name) => name === selectedCategory);

      sectionListRef.current?.scrollToLocation({ sectionIndex, itemIndex: 0 });
    }
  }, [selectedCategory]);

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>ERROR</Text>
  }

  return (
    <View>
      <CategoriesSlider 
        categories={sectionNames} 
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <SectionList 
        sections={sections}
        renderSectionHeader={({section: {title}}) => (
          <View  style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                RootScreenNames.DishDetailScreen, 
                { dish: item }
              );
            }}
          >
            <View style={styles.dishListItem}>
              <Text>{item.item}</Text>
              <FontAwesome name="chevron-right" />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.container}
        ref={sectionListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  chipContainer: {
    paddingVertical: 8,
  },
  sectionHeader: {
    backgroundColor: "white",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 18
  },
  dishListItem: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  separator: {
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.5)",
  }
});

export default RestaurantMenuScreen;
