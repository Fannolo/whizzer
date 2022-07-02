import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppClip from "./features/menu/screens/AppClip";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App({ isClip }: { isClip: boolean }) {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {isClip ? <AppClip /> : <Navigation colorScheme={colorScheme} />}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
