import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableNativeFeedback} from 'react-native';

export default function ServiceItem(props) {
    return (
        <TouchableNativeFeedback
        onPress={()=>{
            props.setItemactive(props.item)
        }}
        >
            <View style={[styles.Service,props.item===props?.itemactive ?{backgroundColor :'#ccc'} : {backgroundColor :'#fff'}]}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{uri:props.item.image}}
                />
                <View style={{ marginHorizontal: 10, justifyContent: 'center', flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.text}>{props.item.nameservice}</Text>
                    <Text style={styles.text}>{props.item.price}.000</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    services: {
        margin: '3%'
    },
    Service: {
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: '3%'
    },
    text: {
        fontSize: 18
    }
})