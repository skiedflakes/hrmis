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
//const {width, height} = Dimensions.get('window');
export default function SplashScreen({navigation}) {
  var count = 1;
  //get token on load page
  useEffect(() => {
    setTimeout(() => {
      start();
    }, 2000);
  }, [count]); // Only re-run the effect if count changes

  const start = async () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'main',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'center'}}> SPLASH SCREEN TEST</Text>
    </View>
  );
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {fontSize: width * 0.5, textAlign: 'center'},
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
