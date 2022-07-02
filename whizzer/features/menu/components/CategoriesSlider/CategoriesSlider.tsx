import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useReducer, useRef } from "react";

type CategoriesSliderProps = {
  categories: string[];
  value?: string;
  onChange?: (newValue?: string) => void;
  scrollOnChange?: boolean;
};

const CategoriesSlider = ({ 
  categories, 
  value, 
  onChange,
  scrollOnChange = true
}: CategoriesSliderProps) => {
  const flatListRef = useRef<FlatList<string>>(null);

  return (
    <FlatList 
      horizontal
      data={categories}
      renderItem={({ item, index }) => {
        const isSelected = item === value;

        return (
          <TouchableOpacity 
            onPress={() => {
              if (onChange) {
                onChange(isSelected ? undefined : item);
              }

              if (scrollOnChange) {
                flatListRef.current?.scrollToIndex({ index })
              }
            }}
          >
            <View style={isSelected ? [styles.chip, styles.selectedChip] : styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
      style={styles.chipsContainer}
      ref={flatListRef}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    padding: 8,
  },
  chip: {
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "rgba(0, 100, 0, 0.5)",
    borderRadius: 16,
    padding: 8,
  },
  selectedChip: {
    backgroundColor: "green",
  },
  chipText: {
    color: "white",
    fontWeight: "bold"
  },
  separator: {
    width: 4,
  }
});

export default CategoriesSlider;
