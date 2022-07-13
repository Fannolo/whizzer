/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";
import { RootScreenNames } from "./constants";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/"), "whizzer://"],
  config: {
    screens: {
      Root: {
        screens: {
          [RootScreenNames.HomeScreen]: {
            screens: {
              Home: "home",
            },
          },

          [RootScreenNames.Map]: {
            screens: {
              Map: "map",
            },
          },
        },
      },
      [RootScreenNames.RestaurantMenuScreen]: { path: "menu/:id" },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
