import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../../components/user/screen/UserScreen';
import UpdatepassScreen from '../../components/user/screen/UpdatepassScreen';
const Stack = createStackNavigator();
export default function UserStackNavigation(){
    return(
        <Stack.Navigator headerMode={'none'}>
             <Stack.Screen name="UserScreen" component={UserScreen} />
             <Stack.Screen name="UpdatepassScreen" component={UpdatepassScreen} />
        </Stack.Navigator>
    )
}