import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  GRAY1,
  GRAY2,
} from 'styles/color_scheme';

export default function ChangePasswordScreen({navigation}) {
  //states
  const [current_password, onChangecurrentpassword] = React.useState('');
  const [new_password, onChangenewpassword] = React.useState('');
  const [confirm_password, onChangeconfirmpassword] = React.useState('');

  const submit = () => {
    Alert.alert('submit');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: 'green',
          justifyContent: 'center',
        }}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
          Reset Password
        </Text>
      </View>
      <View
        style={{
          marginVertical: 50,
          alignContent: 'center',
          flex: 0.9,
          paddingHorizontal: 20,
        }}>
        <TextInput
          style={custom_styles.input}
          onChangeText={text => {
            onChangecurrentpassword(text);
          }}
          value={current_password}
          placeholder="current password"
          secureTextEntry={true}
          placeholderTextColor="black"
        />
        <TextInput
          style={custom_styles.input}
          onChangeText={text => {
            onChangenewpassword(text);
          }}
          value={new_password}
          placeholder="new password"
          secureTextEntry={true}
          placeholderTextColor="black"
        />
        <TextInput
          style={custom_styles.input}
          onChangeText={text => {
            onChangeconfirmpassword(text);
          }}
          value={confirm_password}
          placeholder="confirm new password"
          secureTextEntry={true}
          placeholderTextColor="black"
        />

        <TouchableOpacity
          style={
            current_password != '' &&
            new_password != '' &&
            confirm_password != ''
              ? custom_styles.login_active
              : custom_styles.login_passive
          }
          onPress={() => {
            current_password != '' &&
            new_password != '' &&
            confirm_password != ''
              ? submit()
              : Alert.alert('Please fill in required fields');
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={custom_styles.login_passive_cancel}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
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
    margin: 12,
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'black',
    borderBottomColor: 'green',
    marginTop: 30,
  },
  login_passive: {
    height: 60,
    backgroundColor: 'gray',
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  login_passive_cancel: {
    height: 60,
    backgroundColor: 'gray',
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {fontSize: 13, textAlign: 'center'},
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
