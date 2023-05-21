import {
  NativeBaseProvider,
  Button,
  Input,
  Box,
  Image,
  Center,
} from "native-base";

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
  sendSMS,
} from "../helpers/notificationFunctions";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AlarmClock() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [alarmTime, setAlarmTime] = useState("No Alarm");
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [countdownTime, setCountdownTime] = useState(15);

  const [triggered, isTriggered] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getCurrentTime();
      setCurrentTime(newTime); // this is where the time gets set and updated
      checkAlarm();
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = countdownTime - 1;
      const sendingSMS = async () => {
        await sendSMS();
      };
      if (newTime === 0 && countdownStarted) {
        setCountdownStarted(false);
        sendPushNotification(expoPushTokenAgain, cancelledTitle, cancelledBody);
        sendingSMS().catch(console.error);
      }
      setCountdownTime(newTime); // this is where the time gets set and updated
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await fetch('https://yourapi.com');
  //   }

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [])

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const expoPushTokenAgain = expoPushToken;
  const title = "RING RING";
  const body = "You have 15 seconds until you get cancelled :)";

  const cancelledTitle = "UH OH";
  const cancelledBody = "Someone just got cancelled :')";

  const savedTitle = "*PHEW*";
  const savedBody = "Got lucky punk!";

  const checkAlarm = async () => {
    if (isAlarmOn && currentTime == alarmTime) {
      setIsAlarmOn(false);
      sendPushNotification(expoPushTokenAgain, title, body);
      setCountdownStarted(true);
      setCountdownTime(15);
    }
  };

  const toggleAlarm = () => {
    setIsAlarmOn(!isAlarmOn);
  };

  const [value, setValue] = useState("");

  const sendSMS = async () => {
    try {
      setIsLoading(true);
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

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          alt="clouds"
          paddingBottom={30}
          marginBottom={5}
          source={require("../assets/Clouds.png")}
        />

        <Text style={styles.currentTimeText}>
          {countdownStarted
            ? "YOUR REMAINING TIME IS"
            : "Hello! The current time is"}
        </Text>
        <Text style={styles.currentTime}>
          {countdownStarted ? countdownTime : currentTime}
        </Text>

        {!countdownStarted && (
          <View style={styles.alarmTime}>
            <Text style={styles.text}>Current Alarm: {alarmTime}</Text>
          </View>
        )}

        {countdownStarted ? (
          <Text paddingBottom={20} style={styles.currentTimeText}>
            BEFORE YOU'RE CANCELLED
          </Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={toggleAlarm}>
            <Text style={styles.buttonText}>
              {isAlarmOn ? "Turn Off Alarm" : "Turn On Alarm"}
            </Text>
          </TouchableOpacity>
        )}

        {countdownStarted ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCountdownStarted(false);
              sendPushNotification(expoPushTokenAgain, savedTitle, savedBody);
            }}
          >
            <Text style={styles.buttonText}>I'm awake!</Text>
          </TouchableOpacity>
        ) : (
          <Box marginTop="2" display="flex" flexDirection="row">
            <Input
              width="30%"
              borderRadius="full"
              backgroundColor="transparent"
              variant="outline"
              borderWidth="4"
              paddingLeft={8}
              placeholder="Edit Time"
              borderColor="#C5E2FF"
              color="white"
              value={value}
              onChangeText={(text) => {
                setValue(text);
              }}
            />
            <Button
              onPress={() => {
                setAlarmTime(value);
              }}
              marginLeft={3}
              borderRadius="full"
              backgroundColor="transparent"
              variant="outline"
              borderWidth="4"
              width="25%"
              borderColor="#C5E2FF"
            >
              Save
            </Button>
          </Box>
        )}
        <Image
          alt="bottom_clouds"
          marginTop={7}
          marginLeft={20}
          source={require("../assets/Clouds_bottom.png")}
        />
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
  },
  text: {
    color: "white",
  },
  currentTimeText: {
    fontSize: 20,
    color: "#C5E2FF",
  },
  currentTime: {
    fontSize: 55,
    color: "#F3F4F6",
    marginTop: 10,
    marginBottom: 10,
  },
  alarmTime: {
    fontSize: 17,
    width: 235,
    height: 38,
    color: "#F3F4F6",
    paddingLeft: 38,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#C5E2FF",
    padding: 11,
    width: "58%",
    height: "5%",
    paddingLeft: 60,
    borderRadius: "25",
    marginBottom: 10,
  },
  buttonText: {
    color: "#140C34",
    fontSize: 18,
  },
});
