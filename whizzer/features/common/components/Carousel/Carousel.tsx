import { View, Text, ScrollView, ScrollViewProps } from "react-native";
import React from "react";

interface CarouselProps<T> extends ScrollViewProps {
  data: Array<T>;
  Component: React.FC<CarouselComponentType<T>>;
}

const Carousel = <T,>({ data, Component, ...rest }: CarouselProps<T>) => {
  return (
    <View>
      <ScrollView horizontal {...rest}>
        {data.map((item) => {
          return <Component item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Carousel;
