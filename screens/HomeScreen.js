import React from "react";
import { NativeBaseProvider, Text, Button, Image, Box, Container, Content } from "native-base";

import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";

import * as Notifications from "expo-notifications";
import { CourierClient } from "@trycourier/courier";
import { useState } from "react";
import { useRef } from "react";
import LinearGradient from "react-native-linear-gradient";

import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../helpers/notificationFunctions";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, " is the response");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleClick = async () => {
    await sendPushNotification(expoPushToken);
  };

  // Usage
  const expoPushTokenAgain = expoPushToken;
  const title = "Ring ring";
  const body = "Your twitter is cancelled";
  const bgImage = require("../assets/Background.png");
  
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* <LinearGradient colors={["#120A31", "#64588D"]}> */}
        <StatusBar style="auto" />
        <Box
          width="full"
          height="full"
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Image
            alt="logo"
            size={400}
            marginRight={240}
            marginTop={200}
            source={require("../assets/final_logo.png")}
          />

          <Text 
            fontSize="40" 
            bold color="#F3F4F6" 
            paddingBottom="1"
            paddingTop="5"
            paddingLeft="75">
            Rise or Regret
          </Text>

          <Box
            paddingLeft="90">
            <Button
              borderRadius="full"
              backgroundColor="transparent"
              variant="outline"
              borderWidth="4"
              borderColor="#C5E2FF"
              width="80%"
              height="24%"
              paddingRight="7"
              paddingLeft="10"
              onPress={() => navigation.navigate("Second")}
            >
              <Box display="flex" flexDirection="row">
                <Image
                  alt="twitter"
                  size={10}
                  source={require("../assets/twitter.png")}
                />
                <Text bold color="white" paddingTop="2" paddingLeft="1">
                  Sign in with Twitter{" "}
                </Text>
              </Box>
            </Button>
          </Box>

          <Button onPress={() => navigation.navigate("AlarmClock")}>
            <Text>Hi</Text>
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
        {/* </LinearGradient> */}
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120A31",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Bold"
  },
});
