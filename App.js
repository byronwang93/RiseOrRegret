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
        />

        <Stack.Screen 
          name="Second"
          component={SecondScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>


    // <NativeBaseProvider>
    //   <View style={styles.container}>
        
    //     <NavigationContainer>
    //       <Text>OOOO</Text>
    //     </NavigationContainer>


    //     <Text>Angelina sucks</Text>
    //     <Button>hi</Button>
    //     <Text>Alan hihihihi !!!</Text>
    //     <StatusBar style="auto" />
    //   </View>
    // </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
