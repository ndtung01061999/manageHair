import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreScreen from '../../components/store/StoreScreen';
import UpdatestoreScreen from '../../components/store/Infostore/Updatestore';
const Stack = createStackNavigator();
export default function Storestacknavigation(){
    return(
        <Stack.Navigator headerMode={'none'}>
             <Stack.Screen name="StoreScreen" component={StoreScreen} />
             <Stack.Screen name="UpdatestoreScreen" component={UpdatestoreScreen} />
        </Stack.Navigator>
    )
}