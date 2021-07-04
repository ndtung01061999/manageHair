import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Onestore } from '../../../api/store/Onestore';
export default function Store({ idaccount ,navigation}) {
    const[data,setData]=useState([]);
    useEffect(() => {
        Onestore(`store/account/${idaccount}`, 'GET', null).then(res => {
          setData(res.data)
        })
      },[])
    if (data == null) return null;
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image
                    style={styles.avatar}
                    source={{ uri: data?.image }}
                />
            </View>
            <View style={{ flex: 2 }}>
                <ScrollView>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 25 }}>
                            {data?.name}
                        </Text>
                        <View style={styles.des}>
                            <Text style={{ color: '#535353' }}>
                                {data?.description}
                            </Text>
                        </View>
                        <View style={styles.location}>
                            <Text style={{ fontWeight: 'bold' }}>Địa chỉ : </Text>
                            <Text>{data?.address}</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ fontWeight: 'bold' }}>Thời gian mở cửa : </Text>
                            <Text>{data?.time_start}</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ fontWeight: 'bold' }}>Thời gian đóng cửa : </Text>
                            <Text>{data?.time_end}</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ fontWeight: 'bold' }}>Điện thoại : </Text>
                            <Text>{data?.phone}</Text>
                        </View>
                        <View style={styles.time}>
                            <Text style={{ fontWeight: 'bold' }}>Facebook : </Text>
                            <Text>{data?.facebook}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={()=>{
                                navigation.navigate('UpdatestoreScreen',data)
                            }}
                        >
                            <View style={styles.button}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>SỬA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    des: {

    },
    location: {
        marginTop: '3%',
        flexDirection: 'row'
    },
    time: {
        marginTop: '3%',
        flexDirection: 'row'
    },
    button: {
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC6011',
        width: 100,
        height: 40,
        borderRadius: 10

    }
})