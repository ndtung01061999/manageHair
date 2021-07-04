import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Onestore, Onestorebooking } from '../../../api/store/Onestore';
import BookingItem from '../item/BookingItem';
import { useSelector } from 'react-redux';
export default function BookingScreen({ navigation }) {
  const account = useSelector(state => state.numberReducer);
  console.log(account);
  const [date, setDate] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : `0${(new Date().getMonth() + 1)}`}-${(new Date().getDate()) > 10 ? new Date().getDate() : `0${new Date().getDate()}`}`);
  const [isShow, setisShow] = useState(true);
  const [data, setData] = useState([]);
  const [store, setStore] = useState();
  useEffect(() => {
    Onestore(`store/account/${account?.idaccount}`, 'GET', null).then(res => {
      setStore(res.data)
    })
    Onestorebooking(`${account?.idaccount}/${date}`, 'GET', null).then(res => {
      setData(res.data);
    })
  },[date])
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={() => {
          setisShow(!isShow);
        }}>
        <View style={styles.title}>
          <Image
            source={{ uri: (store?.image) }}
            style={styles.titleImg}></Image>
          <View>
            <Text style={styles.text}>{store?.name}</Text>
            <Text style={styles.text}>{date}</Text>
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.Calendar}>
        {isShow ? (
          <CalendarPicker
            onDateChange={day => {
              let month = '01', day1 = '01';
              if (day._i.month > 8) month = day._i.month + 1;
              else month = `0${day._i.month + 1}`;
              if (day._i.day > 9) day1 = day._i.day;
              else day1 = `0${day._i.day}`;
              setDate(`${day._i.year}-${month}-${day1}`);
            }}
            todayTextStyle={{ color: '#fff' }}
            todayBackgroundColor="#FC6011"
            weekdays={['t2', 't3', 't4', 't5', 't6', 't7', 'cn']}
            months={[
              'tháng 1',
              'tháng 2',
              'tháng 3',
              'tháng 4',
              'tháng 5',
              'tháng 6',
              'tháng 7',
              'tháng 8',
              'tháng 9',
              'tháng 10',
              'tháng 11',
              'tháng 12',
            ]}></CalendarPicker>
        ) : null}
      </View>
      <View style={styles.listbook}>
        {
          data == "" ?
            <View style={{ marginTop: 200, alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Không có lịch đặt</Text>
            </View>
            :
            <FlatList
              contentContainerStyle={{ paddingBottom: 150 }}
              data={data}
              renderItem={({ item }) => {
                return <BookingItem item={item} />
              }
              }
            />
        }
      </View>
      <TouchableOpacity style={styles.button}
        onPress={() => {
          navigation.navigate('CreateBookingCreen', {
            id: store.id,
            date: date,
          })
        }}
      >
        <Text style={{ fontSize: 30, color: '#fff' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#FC6011',
    paddingLeft: 20,
    alignItems: 'center',
  },
  titleImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  Calendar: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
  },
  listbook: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  book: {
    marginBottom: 5,
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    justifyContent: 'center'
  },
  button: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FC6011',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 60
  }
});
