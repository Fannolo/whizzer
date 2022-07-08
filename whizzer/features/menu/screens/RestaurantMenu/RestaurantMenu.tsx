import React, { useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SectionListRenderItem,
  DefaultSectionT,
  SectionListData,
} from 'react-native'

import useSupabaseHelpers from '../../../../hooks/useSupabaseCollection'
import { RootScreenNames } from '../../../../navigation/constants'
import { RootStackScreenProps } from '../../../../types'
import { supabase } from '../../../../utils/supabase'
import { Dish } from '../../../../utils/types'
import CategoriesSlider from '../../components/CategoriesSlider/CategoriesSlider'
import RestaurantMenuItem from './RestaurantMenuItem'

const ITEM_HEIGHT = 150

type RestaurantMenuScreenProps =
  RootStackScreenProps<RootScreenNames.RestaurantMenuScreen>

const RestaurantMenuScreen: React.FC<RestaurantMenuScreenProps> = ({
  route,
}) => {
  const { restaurantId } = route.params

  const { data, isLoading, error } = useSupabaseHelpers(
    supabase
      .from<Dish>('dishes')
      .select()
      .filter('restaurant_id', 'in', `(${restaurantId})`) // TODO: check is condition
      .throwOnError(true),
  )

  const dishes = useMemo(
    () =>
      data?.map((dish) => ({
        ...dish,
        imageURL: supabase.storage
          .from('food-images')
          .getPublicUrl(`${restaurantId}/${dish.code}.jpg`).data?.publicURL,
      })) ?? [],
    [data, restaurantId],
  )

  const sectionListRef = useRef<SectionList<Dish>>(null)

  const dishesByCategory = useMemo(
    () =>
      dishes?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.kind]: [...(acc[curr.kind] ?? []), curr],
        }),
        {} as Record<string, Dish[]>,
      ) ?? {},
    [dishes],
  )

  const sections = useMemo(
    () =>
      Object.entries(dishesByCategory).map(([key, value]) => ({
        title: key,
        data: value,
      })),
    [dishesByCategory],
  )

  const sectionNames = useMemo(
    () => Object.keys(dishesByCategory),
    [dishesByCategory],
  )

  const handleChangeCategory = useCallback(
    (selectedCategory?: string) => {
      const sectionIndex = sectionNames.findIndex(
        (name) => name === selectedCategory,
      )

      sectionListRef.current?.scrollToLocation({
        viewPosition: 0,
        sectionIndex,
        itemIndex: 0,
      })
    },
    [sectionNames],
  )

  const getItemLayout = useCallback(
    (_data: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  )

  const keyExtractor = useCallback((item: Dish) => item.id, [])

  const renderItem = useCallback<SectionListRenderItem<Dish, DefaultSectionT>>(
    ({ item }) => (
      <RestaurantMenuItem item={item} style={{ maxHeight: ITEM_HEIGHT }} />
    ),
    [],
  )

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<Dish, DefaultSectionT> }) =>
      // TODO
      // <View style={styles.sectionHeader}>
      // 	<Text style={styles.sectionHeaderText}>{title}</Text>
      // </View>
      null,
    [],
  )

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>ERROR</Text>
  }

  return (
    <View style={styles.container}>
      <CategoriesSlider
        categories={sectionNames}
        onChange={handleChangeCategory}
      />
      <SectionList
        // ! FIXME
        // getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        ref={sectionListRef}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        style={styles.container}
        onScrollToIndexFailed={(info) => {
          console.warn('onScrollToIndexFailed:', info)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  sectionHeader: {
    backgroundColor: 'white',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default RestaurantMenuScreen
