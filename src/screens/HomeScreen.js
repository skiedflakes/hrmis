import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Button,
  Dimensions,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import {RFValue} from 'react-native-responsive-fontsize';

//libs
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_PRIMARY, COLOR_SECONDARY} from '../styles/color_scheme';
//const {width, height} = Dimensions.get('window');
export default function SplashScreen({navigation}) {
  const logout = () => {
    remove_async('user_details');
    navigation.navigate('LoginScreen');
  };
  const remove_async = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{flex: 0.1, backgroundColor: 'green', justifyContent: 'center'}}>
        <Text
          style={{alignSelf: 'center', color: 'white', fontSize: RFValue(20)}}>
          HRMIS
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 60,
          marginVertical: 50,
          alignContent: 'center',
          flex: 0.9,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 100,
            backgroundColor: COLOR_PRIMARY,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('ApplyScreen');
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: RFValue(20),
              color: 'white',
            }}>
            APPLY FOR LEAVE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 100,
            backgroundColor: COLOR_SECONDARY,
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate('ViewScreen');
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: RFValue(20),
              color: 'white',
            }}>
            APPLICATION STATUS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            height: 100,
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => {
            logout();
          }}>
          <Text
            style={{alignSelf: 'center', fontSize: RFValue(20), color: 'gray'}}>
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {fontSize: width * 0.5, textAlign: 'center'},
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
