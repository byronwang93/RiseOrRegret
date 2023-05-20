import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Button, Image, Box } from "native-base";
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>


        <Button onPress={() => navigation.navigate('Second')}
        width="70%">

            <Box
            display="flex"
            flexDirection="row">
                <Text color="white" paddingTop="1" >Sign in to </Text>
                <Image size={10} source={require('../assets/twitter.png')}/>
            </Box>

        </Button>
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