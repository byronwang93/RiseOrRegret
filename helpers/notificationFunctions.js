import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  let token;
  console.log("inside registerForPushNotificationsAsync");
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log(finalStatus, " is the final status");
    if (existingStatus !== "granted") {
      console.log("not granted 1");
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("not granted 2");
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token:", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    title: title,
    body: body,
    // Add any additional data fields as needed
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log("Push notification result:", result);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

export const sendSMS = async () => {
  try {
    setIsLoading(true);
    console.log("first one in");
    const recipientPhoneNumber = "+16047205368";
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
