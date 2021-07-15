import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import BookingStackNavigation from '../navigationTask/BookingStackNavigation';
import UserStackNavigation from '../navigationTask/UserStackNavigation';
import Storetacknavigation from '../navigationTask/StoreStackNavigation';
import Reportstacknavigation from '../navigationTask/ReportStackNavigation';
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="booking"
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        activeTintColor: '#FC6011',
        inactiveTintColor: '#4A4B4D',
      }}>
      <Tab.Screen
        name="booking"
        component={BookingStackNavigation}
        options={{
          tabBarLabel: 'Lịch đặt',
          tabBarIcon: ({color}) => (
            <Icon name="calendar" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={Storetacknavigation}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="abc"
        component={Reportstacknavigation}
        options={{
          tabBarLabel: 'Báo cáo',
          tabBarIcon: ({color}) => (
            <Icon name="barschart" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="user"
        component={UserStackNavigation}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) => <Icon name="user" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // tabbottom: {
  //   marginBottom: 27,
  // },
});
