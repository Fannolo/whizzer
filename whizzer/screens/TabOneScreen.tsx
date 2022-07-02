import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { supabase } from '../utils/supabase';
import { Dish } from '../utils/types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [dishes, setDishes] = useState<(Dish & { imageURL: string; })[]>([]);

  useEffect(() => {
    supabase
      .from("dishes")
      .select()
      .then(({ data }) => {
        setDishes(data?.map(entry => ({
          ...entry, 
          imageURL: supabase
            .storage
            .from('food-images')
            .getPublicUrl(`${entry.code}.jpg`)
            .data
            ?.publicURL
        })) ?? []);
      })
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dishes}
        renderItem={({ item }) => (
          <View>
            <Text>{item.item}</Text>
            <Image style={styles.image} source={{ uri: item.imageURL }} />
          </View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  }
});
