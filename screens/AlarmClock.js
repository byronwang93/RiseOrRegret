import { NativeBaseProvider, Button, Input, Box, Image, Center } from "native-base";


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlarmClock() {
    const [currentTime, setCurrentTime] = useState(null);
    const [alarmTime, setAlarmTime] = useState('No Alarm Set');
    const [isAlarmOn, setIsAlarmOn] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const newTime = getCurrentTime();
        setCurrentTime(newTime); // this is where the time gets set and updated
        checkAlarm();
      }, 1000);
  
      return () => clearInterval(interval);
    }, [currentTime]);
  
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const checkAlarm = () => {
      if (isAlarmOn && currentTime == alarmTime) {
        alert('Wake up!');
        setIsAlarmOn(false);
      }
    };
  
    const toggleAlarm = () => {
      setIsAlarmOn(!isAlarmOn);
    };

    const [value, setValue] = useState("")
  
    return (
      <NativeBaseProvider>
        <View style={styles.container}>

        <Image
            alt="clouds"
            paddingBottom={30}
            marginBottom={5}
            source={require("../assets/Clouds.png")}
        />
            
          <Text style={styles.currentTimeText}>Hello! The current time is</Text>
          <Text style={styles.currentTime}>{currentTime}</Text>
          
          <View style={styles.alarmTime}>
            <Text style={styles.text}>Current Alarm: {alarmTime}</Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={toggleAlarm}>
            <Text style={styles.buttonText}>{isAlarmOn ? 'Turn Off Alarm' : 'Turn On Alarm'}</Text>
          </TouchableOpacity>
          
          <Box 
            marginTop="2" 
            display="flex" 
            flexDirection="row">
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
              onChangeText={text => {
                setValue(text)
            }} />
            <Button 
              onPress={() => {
                setAlarmTime(value)
            }}
              marginLeft={3}
              borderRadius="full"
              backgroundColor="transparent"
              variant="outline"
              borderWidth="4"
              width="25%"
              borderColor="#C5E2FF">
              Save
            </Button>
          </Box>
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
      backgroundColor: '#120A31',
      alignItems: 'center',
      justifyContent: 'center',
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
      paddingLeft: 10,
      marginBottom: 5,
    },
    button: {
      backgroundColor: '#C5E2FF',
      padding: 11,
      width: "58%",
      height: "5%",
      paddingLeft: 60,
      borderRadius: "25",
      marginBottom: 10,
    },
    buttonText: {
      color: '#140C34',
      fontSize: 18,
    },
  });