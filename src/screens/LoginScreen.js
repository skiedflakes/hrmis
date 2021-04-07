import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  GRAY1,
  GRAY2,
  Alert,
} from 'styles/color_scheme';

export default function LoginScreen({navigation}) {
  //states
  const [username, onChangeusername] = React.useState('');
  const [password, onChangpassword] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  const setItemStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  const login = async () => {
    const formData = new FormData();
    formData.append('username', '1000180');
    formData.append('password', '123');
    fetch(global.url + '/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 1) {
          setItemStorage('user_details', {
            employee_id: responseJson.result[0].employeeid,
            user_name:
              responseJson.result[0].firstname +
              ' ' +
              responseJson.result[0].surname,
          });
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'main',
                params: {
                  screenlist: 'home',
                },
              },
            ],
          });
        } else {
          console.log('error connection');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={custom_styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            marginHorizontal: 40,

            alignContent: 'center',
          }}>
          <TextInput
            style={custom_styles.input}
            onChangeText={text => {
              onChangeusername(text);
            }}
            value={username}
            placeholder="Employee ID "
          />
          <TextInput
            style={custom_styles.input}
            onChangeText={text => {
              onChangpassword(text);
            }}
            value={password}
            placeholder="Password"
          />

          <TouchableOpacity
            style={
              password != '' && username != ''
                ? custom_styles.login_active
                : custom_styles.login_passive
            }
            onPress={() => {
              login();
              // navigation.navigate('HomeScreen');
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              fontSize: 13,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#ee6943',
              }}>
              Forgot password ?
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const custom_styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    fontSize: 16,
    color: 'gray',
    borderBottomColor: '#c9c7c7',
    marginTop: 30,
  },
  login_passive: {
    height: 60,
    backgroundColor: GRAY1,
    marginTop: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  login_active: {
    height: 60,
    backgroundColor: 'green',
    marginTop: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
});
