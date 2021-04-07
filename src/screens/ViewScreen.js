import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
//libs
import AsyncStorage from '@react-native-community/async-storage';

import {COLOR_PRIMARY, COLOR_SECONDARY} from '../styles/color_scheme';
//const {width, height} = Dimensions.get('window');

// status pending = 0, canceled - 2, approved - 1,
const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'transaction-1',
    status: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'transaction-2',
    status: 2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'transaction-3',
    status: 3,
  },
];

const Item = ({title, status}) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {title} {status}
    </Text>
  </View>
);

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

  const renderItem = ({item}) => (
    <Item title={item.title} status={item.status} />
  );

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
          alignContent: 'center',
          flex: 0.9,
        }}>
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <View style={{flex: 0.8}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{padding: 10}}
            />
          </View>

          <View
            style={{
              flex: 0.2,

              justifyContent: 'center',
            }}>
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
  item_canceled: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  item_pending: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: 'yellow',
    borderWidth: 1,
  },
  item_approved: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
  },
});
