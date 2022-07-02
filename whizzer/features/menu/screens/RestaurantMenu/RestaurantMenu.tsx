import { View, Text, ScrollView, FlatList, StyleSheet, SectionList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useSupabaseHelpers from "../../../../hooks/useSupabaseCollection";
import { supabase } from "../../../../utils/supabase";
import { Dish } from "../../../../utils/types";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";

const RestaurantMenuScreen = (): JSX.Element => {
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
          <View>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View>
            <Text>{item.item}</Text>
          </View>
        )}
        style={styles.container}
        ref={sectionListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  chipContainer: {
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: "green",
    borderRadius: 16,
    padding: 8
  },
  chipText: {
    color: "white",
    fontWeight: "bold"
  },
  sectionHeader: {
    
  },
  sectionHeaderText: {
    fontWeight: "bold",
    backgroundColor: "white"
  }
});

export default RestaurantMenuScreen;
