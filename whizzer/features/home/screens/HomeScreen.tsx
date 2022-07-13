import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import Carousel from "../../common/components/Carousel/Carousel";
import useSupabaseHelpers from "../../../hooks/useSupabaseCollection";
import { Restaurant } from "../../../utils/types";
import { supabase } from "../../../utils/supabase";
import nfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

const HomeScreen = (): JSX.Element => {
  const { data, error, isLoading } = useSupabaseHelpers(
    supabase.from<Restaurant>("restaurants").select().throwOnError(true)
  );

  const readNdef = async () => {
    try {
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await nfcManager.getTag();
      if (tag?.ndefMessage[0].payload) {
        const decodedMessage = Ndef.text.decodePayload(
          tag.ndefMessage[0].payload as unknown as Uint8Array
        );
        const parsedJson = JSON.parse(decodedMessage);
        Linking.openURL(parsedJson.link);
      }
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      nfcManager.cancelTechnologyRequest();
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>ERROR</Text>;
  }

  const dataTest =
    data?.map((restaurant) => ({
      ...restaurant,
      image: "../../../assets/images/sushi_restaurant_cover.jpeg",
    })) ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Recommended</Text>
        <Carousel
          data={dataTest}
          showsHorizontalScrollIndicator={false}
          Component={RestaurantCard}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={readNdef} style={styles.scanButton}>
            <Text style={styles.scanText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  scanButton: {
    position: "absolute",
    backgroundColor: "black",
    width: "50%",
    bottom: 100,
    padding: 20,
    borderRadius: 30,
  },
  scanText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
