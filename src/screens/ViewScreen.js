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
    status: 'P',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'transaction-2',
    status: 'C',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'transaction-3',
    status: 'A',
  },
];

const Item = ({title, status}) => (
  <View
    style={
      status == 'P'
        ? styles.item_pending
        : status == 'A'
        ? styles.item_approved
        : status == 'C'
        ? styles.item_canceled
        : null
    }>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function ViewScreen({navigation}) {
  const [trans_list, settrans_list] = useState([]);
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

  var count = 1;
  //get token on load page
  useEffect(() => {
    get_transactions();
  }, [count]); // Only re-run the effect if count changes

  const get_transactions = async () => {
    const user_info = await AsyncStorage.getItem('user_details'); //logged in
    const parsed_user_info = JSON.parse(user_info);
    console.log(parsed_user_info);

    const formData = new FormData();
    formData.append('employee_id', parsed_user_info.employee_id);
    fetch(global.url + '/get_transactions.php', {
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
        var my_list = responseJson.result.map(function (item, index) {
          return {
            id: item.LEAVETRANSMSTRID,
            title: 'No: ' + item.LEAVETRANSMSTRID,
            status: item.APPROVED,
          };
        });

        settrans_list(my_list);
      })
      .catch(error => {
        console.log(error);
      });
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
          alignContent: 'center',
          flex: 0.9,
        }}>
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <View style={{flex: 0.8}}>
            <FlatList
              data={trans_list}
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
    padding: 20,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  item_pending: {
    padding: 20,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  item_approved: {
    padding: 20,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});
