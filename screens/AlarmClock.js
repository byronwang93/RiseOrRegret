import { NativeBaseProvider, Button, Input, Box} from "native-base";


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlarmClock() {
    const [currentTime, setCurrentTime] = useState(null);
    const [alarmTime, setAlarmTime] = useState('No Alarm Currently Set');
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
      return `Current Time: ${hours}:${minutes}:${seconds}`;
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
            
          <Text style={styles.currentTime}>{currentTime}</Text>
          
          <Text style={styles.alarmTime}>Alarm time: {alarmTime}</Text>
          
          <TouchableOpacity style={styles.button} onPress={toggleAlarm}>
            <Text style={styles.buttonText}>{isAlarmOn ? 'Turn Off Alarm' : 'Turn On Alarm'}</Text>
          </TouchableOpacity>
          
          <Box marginTop="6" display="flex" flexDirection="row">
            <Input width="50%" placeholder="Edit Time" value={value} onChangeText={text => {
                setValue(text)
            }} />
            <Button onPress={() => {
                setAlarmTime(value)
            }}>
                Click me
            </Button>
          </Box>


        </View>
      </NativeBaseProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentTime: {
      fontSize: 24,
      marginBottom: 20,
    },
    alarmTime: {
      fontSize: 18,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
  });