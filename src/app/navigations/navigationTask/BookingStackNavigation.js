import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../../components/booking/screen/BookingScreen';
import CreateBookingCreen from '../../components/booking/screen/CreateBookingCsreen';
const Stack = createStackNavigator();
export default function BookingStackNavigation(){
    return(
        <Stack.Navigator headerMode={'none'}>
             <Stack.Screen name="BookingScreen" component={BookingScreen} />
             <Stack.Screen name="CreateBookingCreen" component={CreateBookingCreen} />
        </Stack.Navigator>
    )
}