import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light,
      ...{
        "color-primary-100": "red",
        "color-primary-200": "red",
        "color-primary-300": "red",
        "color-primary-400": "red",
        "color-primary-500": "#f451fe",
        "color-primary-600": "#000",
        "color-primary-700": "#000",
        "color-primary-800": "red",
        "color-primary-900": "red",
      
        "background-basic-color-1": "red",
  "background-basic-color-2": "#f451fe",
  "background-basic-color-3": "#f451fe",
  "background-basic-color-4": "#f451fe",

  "border-basic-color-1": "#f451fe",
  "border-basic-color-2": "#f451fe",
  "border-basic-color-3": "#f451fe",
  "border-basic-color-4": "#f451fe",
  "border-basic-color-5": "#f451fe"
      }
    }}>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f451fe',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{title: 'Login Page',headerBackButtonMenuEnabled:false}} />
      <Stack.Screen name="details" options={{title:'Profile',headerBackButtonMenuEnabled:false}} />
    </Stack>
    </ApplicationProvider>
  );
}
