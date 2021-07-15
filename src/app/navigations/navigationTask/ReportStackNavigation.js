import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StoreScreen from '../../components/store/StoreScreen';
import UpdatestoreScreen from '../../components/store/Infostore/Updatestore';
import ReportScreen from '../../components/report/ReportScreen';
const Stack = createStackNavigator();
export default function Reportstacknavigation() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  );
}
