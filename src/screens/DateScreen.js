import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//libs
//const {width, height} = Dimensions.get('window');
export default function DateScreen({navigation, route}) {
  const {leave_type, leave_id} = route.params;

  const [date_list, set_date_list] = useState([]);
  const [count_dates, setcount_dates] = useState('0');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDatePickerVisibility(false);
    var time = date.getTime();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var min = date.getMinutes();
    var ss = date.getSeconds();
    var mili = date.getMilliseconds();
    var final_date = yyyy + '-' + mm + '-' + dd;

    setselected_date(final_date);
    var add_date_ = {
      id: Math.random(),
      title: final_date,
    };
    date_list.push(add_date_);
    set_date_list(date_list);
    setcount_dates(date_list.length);
  };

  const [selected_date, setselected_date] = useState();
  const renderItem = ({item}) => (
    <Item title={item.title} id={item.id} cancel_item={cancel_item} />
  );

  const Item = ({title, id, cancel_item}) => (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        style={{flex: 0.3}}
        onPress={() => {
          cancel_item(id);
        }}>
        <Text style={styles.textcencel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const cancel_item = async id => {
    date_list.splice(
      date_list.findIndex(function (i) {
        return i.id == id;
      }),
      1,
    );

    setcount_dates(date_list.length);
    set_date_list(date_list);
  };

  const add_transaction = async () => {
    setModalVisible(true);
    var fdate_list = date_list.map(function (item, index) {
      return {date: item.title};
    });

    var json_arr = JSON.stringify(fdate_list);

    const user_info = await AsyncStorage.getItem('user_details'); //logged in
    const parsed_user_info = JSON.parse(user_info);

    const formData = new FormData();
    formData.append('empid', parsed_user_info.employee_id);
    formData.append('leavetype', leave_type);

    formData.append('date_applied', get_date_time());

    fetch(global.url + '/add_transaction.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          date_list.map(function (item, index) {
            var myindex = index + 1;
            add_transaction_details(responseJson.id, item.title, myindex);
          });
        } else {
          console.log('error connection');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const add_transaction_details = async (transaction_id, date, myindex) => {
    const formData = new FormData();
    formData.append('transaction_id', transaction_id);
    formData.append('date', date);

    fetch(global.url + '/add_transaction_details.php', {
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
          if (date_list.length == myindex) {
            setModalVisible(false);
            Alert.alert('success');
            navigation.popToTop();
          }
        } else {
          setModalVisible(false);
          Alert.alert('failed');
          console.log('error connection');
        }
      })
      .catch(error => {
        setModalVisible(false);
        Alert.alert('failed');
        console.log('error connection');
      });
  };

  const get_date_time = () => {
    var today = new Date();
    var time = new Date().getTime();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var ss = today.getSeconds();
    var mili = today.getMilliseconds();
    return (today =
      yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss);
  };

  //modal loading
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modal_styles.centeredView}>
          <View style={modal_styles.modalView}>
            <ActivityIndicator size="small" color={'gray'} />
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        minimumDate={leave_id == '1561' ? new Date(2021, 4, 23) : null}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View
        style={{
          flex: 0.1,
          backgroundColor: 'green',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
          {leave_type} Leave
        </Text>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: 'white',
            alignSelf: 'center',
            marginHorizontal: 8,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {count_dates}
          </Text>
        </View>
      </View>

      <View
        style={{
          alignContent: 'center',
          flex: 0.9,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
          }}>
          <View style={{flex: 0.7}}>
            <FlatList
              data={date_list}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{padding: 10}}
            />
          </View>

          <View style={{flex: 0.5}}>
            <TouchableOpacity
              style={{
                width: '50%',
                height: 50,
                borderColor: 'blue',
                borderWidth: 2,
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                showDatePicker();
              }}>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text
                  style={{alignSelf: 'center', fontSize: 20, color: 'blue'}}>
                  ADD DATE
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '50%',
                height: 50,
                borderColor: 'green',
                borderWidth: 2,
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
              onPress={() => {
                add_transaction();
                // navigation.popToTop();
              }}>
              <Text style={{alignSelf: 'center', fontSize: 20, color: 'green'}}>
                SUBMIT
              </Text>
            </TouchableOpacity>

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
  text: {
    fontSize: 18,
    flex: 0.7,
    backgroundColor: '#d1d1d1',
    textAlign: 'center',
    margin: 1,
    padding: 15,
    fontWeight: 'bold',
  },
  textcencel: {
    fontSize: 18,

    backgroundColor: '#d1d1d1',
    textAlign: 'center',
    margin: 1,
    padding: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
  },
});

const modal_styles = StyleSheet.create({
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
    padding: 35,
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
  },
});
