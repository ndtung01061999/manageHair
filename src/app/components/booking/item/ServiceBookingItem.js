import React,{ useState }  from 'react';
import { View, StyleSheet, Text } from 'react-native';
export default function ServiceBookingItem({item}) {
    return (
        <View style={styles.service}>
            <View style={styles.name}>
                <Text style={{ fontSize: 18 }}>
                    {item.nameservice}
                </Text>
            </View>
            <View style={styles.cost}>
                <Text style={{ fontSize: 18, paddingRight: '3%' }}>
                    {item.price}.000
                </Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    service: {
        marginTop: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    name: {
        justifyContent: 'center',
        flex: 1,
    },
    cost: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})