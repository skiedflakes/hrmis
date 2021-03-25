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
} from 'styles/color_scheme';

export default function LoginScreen({navigation}) {
  //states
  const [username, onChangeusername] = React.useState('');
  const [password, onChangpassword] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  const btn_login = () => {
    setItemStorage('user_details', {
      user_id: 'test_id',
      user_name: 'test name',
    });
    navigation.replace('HomeScreen');
  };

  const setItemStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
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
            onChangeText={onChangeusername}
            value={username}
            placeholder="Employee ID "
          />
          <TextInput
            style={custom_styles.input}
            onChangeText={onChangpassword}
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
              btn_login();
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
