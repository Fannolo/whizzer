import React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import useSupabaseHelpers from '../hooks/useSupabaseCollection';
import { RootTabScreenProps } from '../types';
import { supabase } from '../utils/supabase';
import { Dish } from '../utils/types';

export default function TabOneScreen() {
  const { data, error, isLoading } = useSupabaseHelpers<Dish>(
    supabase.from<Dish>("dishes").select().throwOnError(true)
  );

  const dishes = data?.map(dish => ({
    ...dish, 
    imageURL: supabase
      .storage
      .from('food-images')
      .getPublicUrl(`${dish.code}.jpg`)
      .data
      ?.publicURL
  })) ?? [];

  if (error) {
    return <Text>ERROR</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

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
