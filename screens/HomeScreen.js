import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Button, Image, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import * as Notifications from "expo-notifications";
import { CourierClient } from "@trycourier/courier";
import { useState } from "react";
import { useRef } from "react";

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

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Button
          onPress={() => sendPushNotification(expoPushTokenAgain, title, body)}
        >
          Test button
        </Button>
        <Button title="Press to Send Notification" onPress={handleClick}>
          Press to Send Notification
        </Button>
        <Button onPress={() => navigation.navigate("Second")}>
          navigate to second screen
        </Button>
        <StatusBar style="auto" />
        <Box
          backgroundColor="#1B1F22"
          width="full"
          height="full"
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Image
            alt="logo"
            borderRadius={80}
            marginBottom="8"
            source={require("../assets/logo2.png")}
          />

          <Text fontSize="3xl" bold color="white" paddingBottom="2">
            Rise or Regret
          </Text>

          <Button
            marginTop="3"
            borderRadius="full"
            backgroundColor="#1B1F22"
            variant="outline"
            borderWidth="2"
            borderColor="white"
            width="70%"
            paddingRight="8"
            onPress={() => navigation.navigate("Second")}
          >
            <Box display="flex" flexDirection="row">
              <Image
                alt="twitter"
                size={10}
                source={require("../assets/twitter.png")}
              />
              <Text bold color="white" paddingTop="2" paddingLeft="2">
                Sign in with Twitter{" "}
              </Text>
            </Box>
          </Button>

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
