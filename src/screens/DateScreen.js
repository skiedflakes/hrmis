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
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

//libs
//const {width, height} = Dimensions.get('window');
export default function DateScreen({navigation, route}) {
  const {leave_type} = route.params;

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
    var final_date = (date = mm + '-' + dd + '-' + yyyy);
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

    console.log(date_list);
    setcount_dates(date_list.length);
    set_date_list(date_list);
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
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
                navigation.popToTop();
              }}>
              <Text style={{alignSelf: 'center', fontSize: 20, color: 'green'}}>
                CONFIRM
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
