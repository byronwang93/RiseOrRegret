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
          <Box backgroundColor="#1B1F22" width="full" height="full" flex={1} justifyContent="center" alignItems="center" p={4}>

            <Image borderRadius={80} marginBottom="10" source={require('../assets/logo2.png')}/>

            <Text fontSize="3xl" bold color="white" paddingBottom="2">Rise or Regret</Text>

            <Button borderRadius="full" backgroundColor="#1B1F22" variant="outline" borderWidth="2" borderColor="white" width="70%" paddingRight="8" onPress={() => navigation.navigate('Second')}>

                <Box display="flex" flexDirection="row">
                    <Image size={10} source={require('../assets/twitter.png')}/>
                    <Text bold color="white" paddingTop="2" paddingLeft="2"  >Sign in with Twitter </Text>
                </Box>

            </Button>
            <StatusBar style="auto" />

          </Box>


        {/* <Button borderRadius="full" backgroundColor="#1B1F22" variant="outline" borderWidth="2" borderColor="white" onPress={() => navigation.navigate('Second')} width="70%">

            <Box display="flex" flexDirection="row">
                <Image size={10} source={require('../assets/twitter.png')}/>
                <Text bold color="white" paddingTop="1" paddingLeft="2"  >Sign in with Twitter </Text>
            </Box>

        </Button>
        <StatusBar style="auto" /> */}
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