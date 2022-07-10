import { Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

const RestaurantMenuScreen = (): JSX.Element => {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn("Tag found", tag);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  return (
    <ScrollView>
      <Text>RestaurantMenuScreen</Text>
      <TouchableOpacity onPress={readNdef}>
        <Text>Touch me</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RestaurantMenuScreen;
