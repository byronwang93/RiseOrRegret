import React, { useState, useEffect, useRef } from "react";
// 1. import `NativeBaseProvider` component
// import { NativeBaseProvider, Text, Button } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import SecondScreen from "./screens/SecondScreen";
import AlarmClock from "./screens/AlarmClock";

import registerNNPushToken from "native-notify";

const Stack = createNativeStackNavigator();

export default function App() {
  registerNNPushToken(8117, "T2roOCBtQgluMITKNtsk20");

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

        <Stack.Screen
          name="AlarmClock"
          component={AlarmClock}
          options={{headerShown: false}}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}