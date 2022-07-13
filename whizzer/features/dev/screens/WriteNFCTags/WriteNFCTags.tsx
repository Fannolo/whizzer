import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import nfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

const WriteNFCTags = (): JSX.Element => {
  async function writeNdef() {
    let result = false;
    try {
      // STEP 1
      await nfcManager.requestTechnology(NfcTech.Ndef);
      const payload = {
        tableId: "1",
        restaurantId: "4",
        link: "whizzer://menu/4",
      };
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(payload)),
      ]);

      if (bytes) {
        await nfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4
      nfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  return (
    <View>
      {!process.env.NODE_ENV ||
        (process.env.NODE_ENV === "development" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={writeNdef} style={styles.scanButton}>
              <Text style={styles.scanText}>Write</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

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
export default WriteNFCTags;
