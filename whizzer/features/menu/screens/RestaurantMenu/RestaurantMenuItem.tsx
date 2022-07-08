import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { RootScreenNames } from '../../../../navigation/constants'
import { Dish } from '../../../../utils/types'

interface RestaurantMenuItemProps {
  item: Dish
  style?: StyleProp<ViewStyle>
}

const RestaurantMenuItem = ({ item, style }: RestaurantMenuItemProps) => {
  const navigation = useNavigation()

  const handlePress = useCallback(() => {
    navigation.navigate(RootScreenNames.DishDetailScreen, {
      dish: item,
    })
  }, [item, navigation])

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      <View style={styles.dishListItem}>
        <View style={styles.textContainer}>
          <Text style={styles.bold}>{item.item}</Text>
          <Text style={styles.priceText}>{`${item.price}$`}</Text>
          <Text style={{ color: 'grey' }}>{`${item.ingredients}`}</Text>
        </View>
        <Image style={styles.foodImage} source={{ uri: item.imageURL }} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  dishListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  foodImage: {
    width: 100,
    height: 100,
  },
  priceText: {
    fontWeight: '400',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
})

export default RestaurantMenuItem
