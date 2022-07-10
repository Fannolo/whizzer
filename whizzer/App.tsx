import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import React from "react";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./components/Themed";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const readNdef = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn({ tag });
      tag?.ndefMessage[0].payload.values();
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={readNdef} style={styles.scanButton}>
            <Text style={styles.scanText}>Scan</Text>
          </TouchableOpacity>
        </View>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
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
