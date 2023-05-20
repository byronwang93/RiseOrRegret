import React from "react";
// 1. import `NativeBaseProvider` component
// import { NativeBaseProvider, Text, Button } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import SecondScreen from "./screens/SecondScreen";


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="Second"
          component={SecondScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}