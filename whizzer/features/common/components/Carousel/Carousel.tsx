import { View, ScrollViewProps, FlatList } from "react-native";
import React from "react";

interface CarouselProps<T> extends ScrollViewProps {
  data: Array<T>;
  Component: React.FC<CarouselComponentType<T>>;
}

const Carousel = <T,>({ data, Component, ...rest }: CarouselProps<T>) => {
  return (
    <View>
      <FlatList
        horizontal
        {...rest}
        data={data}
        renderItem={({ item }) => {
          if ("id" in item) {
            return <Component item={item} />;
          }
          return null;
        }}
      ></FlatList>
    </View>
  );
};

export default Carousel;
