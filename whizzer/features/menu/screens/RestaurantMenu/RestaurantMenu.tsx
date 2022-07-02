import { View, Text, ScrollView, FlatList, StyleSheet, SectionList } from "react-native";
import React from "react";
import useSupabaseHelpers from "../../../../hooks/useSupabaseCollection";
import { supabase } from "../../../../utils/supabase";
import { Dish } from "../../../../utils/types";

const RestaurantMenuScreen = (): JSX.Element => {
  const { data, isLoading, error } = useSupabaseHelpers(
    supabase.from<Dish>("dishes").select().throwOnError(true),
  );

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>ERROR</Text>
  }

  const dishesByCategory = data?.reduce((acc, curr) => ({
    ...acc,
    [curr.kind]: [...(acc[curr.kind] ?? []), curr]
  }), {} as Record<string, Dish[]>) ?? {};

  return (
    <View>
      <FlatList 
        horizontal
        data={Object.keys(dishesByCategory)}
        renderItem={({ item }) => (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        )}
        style={[styles.container, styles.chipContainer]}
      />
      <SectionList 
        sections={Object.entries(dishesByCategory).map(([key, value]) => ({ title: key, data: value }))}
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
