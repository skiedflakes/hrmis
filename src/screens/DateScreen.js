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
export default function DateScreen({navigation}) {
  const [date_list, set_date_list] = useState([]);

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
  };

  const [selected_date, setselected_date] = useState();
  const renderItem = ({item}) => <Item title={item.title} />;

  const Item = ({title}) => (
    <TouchableOpacity onPress={() => select_leave(title)}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View
        style={{flex: 0.1, backgroundColor: 'green', justifyContent: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
          SELECT YOUR DATES
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
          <Button title="Show Date Picker" onPress={showDatePicker} />

          <FlatList
            data={date_list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
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
