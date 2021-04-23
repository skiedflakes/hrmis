import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

//libs
import AsyncStorage from '@react-native-community/async-storage';

import {COLOR_PRIMARY, COLOR_SECONDARY} from '../styles/color_scheme';
//const {width, height} = Dimensions.get('window');
export default function SplashScreen({navigation}) {
  const DATA = [
    {
      id: '1561',
      title: 'Vacation',
    },
    {
      id: '1562',
      title: 'Sick',
    },
    {
      id: '1563',
      title: 'Privilege',
    },
    {
      id: '1564',
      title: 'Special',
    },
  ];
  const Item = ({title, id}) => (
    <TouchableOpacity onPress={() => select_leave(title, id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const select_leave = (title, id) => {
    setModalVisible(!modalVisible);
    navigation.navigate('DateScreen', {
      leave_type: title,
      leave_id: id,
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selected_leave, setselected_leave] = useState('');
  const [selected_leave_id, setselected_leave_id] = useState('');
  const renderItem = ({item}) => <Item title={item.title} id={item.id} />;

  return (
    <View style={styles.container}>
      <View
        style={{flex: 0.1, backgroundColor: 'green', justifyContent: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
          SELECT LEAVE TYPE
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,

          alignContent: 'center',
          flex: 0.9,
          justifyContent: 'center',
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={{
            width: '50%',
            height: 50,
            borderColor: 'gray',
            borderWidth: 2,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 40,
          }}
          onPress={() => {
            navigation.popToTop();
          }}>
          <Text style={{alignSelf: 'center', fontSize: 20, color: 'gray'}}>
            CANCEL
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 60,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  item_back: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 30,
    color: 'green',
  },
  title_back: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 30,
    color: 'gray',
  },
});
