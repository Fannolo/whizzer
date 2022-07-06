import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";

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
  scrollOnChange = true,
}: CategoriesSliderProps) => {
  const flatListRef = useRef<FlatList<string>>(null);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        const isSelected = item === value;

        return (
          <TouchableOpacity
            onPress={() => {
              if (onChange) {
                onChange(isSelected ? undefined : item);
              }

              if (scrollOnChange) {
                flatListRef.current?.scrollToIndex({ index });
              }
            }}
          >
            <View style={[styles.chip, isSelected && styles.selectedChip]}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
      style={styles.chipsContainer}
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
    borderColor: "white",
    backgroundColor: "white",
    padding: 8,
  },
  selectedChip: {
    backgroundColor: "white",
    textDecorationLine: "underline",
    borderBottomColor: "black",
  },
  chipText: {
    color: "black",
    fontWeight: "bold",
  },
  separator: {
    width: 4,
  },
});

export default CategoriesSlider;
