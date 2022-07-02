import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RootScreenNames } from '../../../../navigation/constants';
import { RootStackScreenProps } from '../../../../types';

type DishDetailScreenProps = RootStackScreenProps<RootScreenNames.DishDetailScreen>;

const DishDetailScreen: React.FC<DishDetailScreenProps> = ({ route }) => {
  const { dish } = route.params;
  
  return (
    <View>
      <Text>{dish.item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});


export default DishDetailScreen;
