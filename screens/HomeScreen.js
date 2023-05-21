import React from "react";
import { NativeBaseProvider, Text, Button, Image, Box } from "native-base";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import * as Notifications from "expo-notifications";
import { useState, useEffect } from "react";
import { useRef } from "react";

import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../helpers/notificationFunctions";
import axios from "axios";

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

  const [isLoading, setIsLoading] = useState(false);

  const sendSMS = async () => {
    try {
      setIsLoading(true);
      console.log("first one in");
      const recipientPhoneNumber = "+16047163698";
      // const response = await fetch(
      //   `http://localhost:3000/send-sms?to=${recipientPhoneNumber}`
      // );
      // const response = await fetch(`http://localhost:3000/send-sms`);
      const response = await axios
        .get(`http://207.23.196.207:3000/send-sms`)
        .catch((error) => {
          console.log(error, " is the error");
        });
      console.log(response, " is the response");

      const data = await response.json();

      console.log(data, " is the data"); // Handle the response data as per your requirements

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.error(error);
      setIsLoading(false);
    }
  };

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
          <Button onPress={sendSMS} disabled={isLoading}>
            <Text>Twilio test</Text>
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
