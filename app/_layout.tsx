import { Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default function RootLayout() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva.light,
          ...{
            // ...
            "color-primary-100": "#00524C",
            "color-primary-200": "#d9e4ff",
            "color-primary-300": "#a6c1ff",
            "color-primary-400": "#598bff",
            "color-primary-500": "#3366ff",
            "color-primary-600": "#284de0",
            "color-primary-700": "#2541cc",
            "color-primary-800": "#00524C",
            "color-primary-900": "#00524C",
            // ...
          },
        }}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="details"
            options={{ headerShown: false, headerBackButtonMenuEnabled: false }}
          />
        </Stack>
      </ApplicationProvider>
    </React.Fragment>
  );
}
