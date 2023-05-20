import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Button } from "native-base";
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>


        <Text>Angelina sucks</Text>
        <Button onPress={() => navigation.navigate('Second')}>
            navigate to second screen
        </Button>

        <Text>Alan hihihihi !!!</Text>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});