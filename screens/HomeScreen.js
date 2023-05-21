import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Button } from "native-base";
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
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Notification Title:{" "}
            {notification && notification.request.content.title}{" "}
          </Text>
          <Text>
            Notification Body:{" "}
            {notification && notification.request.content.body}
          </Text>
          <Text>
            Notification Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
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
