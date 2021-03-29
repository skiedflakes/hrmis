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
//libs
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_PRIMARY, COLOR_SECONDARY} from '../styles/color_scheme';
//const {width, height} = Dimensions.get('window');
export default function SplashScreen({navigation}) {
  const logout = () => {
    navigation.goBack();
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
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
          REQUESTS
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 60,
          marginVertical: 20,
          alignContent: 'center',
          flex: 0.9,
        }}>
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 50,
              borderColor: 'gray',
              borderWidth: 2,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{alignSelf: 'center', fontSize: 20, color: 'gray'}}>
              BACK
            </Text>
          </TouchableOpacity>
        </View>
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
