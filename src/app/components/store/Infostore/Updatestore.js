import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import City from '../../../api/location/City';
import District from '../../../api/location/District';
import Customer from '../../../api/customer/Customer';
import {Onestore} from '../../../api/store/Onestore';
function CallAPIdistrict(id, setDistrict,) {
    District(id, 'GET', null).then(res => {
        setDistrict(res.data)
    })
}
function Update(data,navigation) {
    console.log(data)
    Onestore(`store/${data.id}`,'PUT',data).then(res=>{
        if(res?.status==200){
            alert("Thanh cong")
            navigation.replace('StoreScreen')
        }
    })
}
export default function UpdatestoreScreen(props) {
    const list = [];
    for (var i = 1; i <= 24; i++) {
        if (i < 10) {
            list.push({
                label: '0' + i,
                value: '0' + i
            })
        }
        else {
            list.push({
                label: i.toString(),
                value: i.toString()
            })
        }
    }
    const [data, setData] = useState(props.route.params);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    let time_starts = data.time_start.split(':');
    let time_ends = data.time_end.split(':');
    const [time_start, setTime_start] = useState({
        hour: time_starts[0],
        min: time_starts[1]
    })
    const [time_end, setTime_end] = useState({
        hour: time_ends[0],
        min: time_ends[1]
    })
    useEffect(() => {
        City(null).then(res => {
            setCity(res.data)
        })
    }, [data])
    if (data == null) return null;
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ScrollView>
                <View>
                    <Image
                        style={styles.avatar}
                        source={{ uri: data.image }}
                    />
                </View>
                {/* application */}
                <View>
                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>T??n CH :</Text>
                        </View>
                        <View >
                            <TextInput
                                style={styles.input}
                                value={data?.name}
                                onChangeText={(text) => {
                                    setData(item => ({
                                        ...item,
                                        name: text
                                    }))
                                }}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>Facebook :</Text>
                        </View>
                        <View >
                            <TextInput
                                style={styles.input}
                                value={data?.facebook}
                                onChangeText={(text) => {
                                    setData(item => ({
                                        ...item,
                                        facebook: text
                                    }))
                                }}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>S??T :</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.title, { marginRight: 5 }]}>0</Text>
                            <TextInput
                                style={styles.input}
                                value={data?.phone}
                                onChangeText={(text) => {
                                    setData(item => ({
                                        ...item,
                                        phone: text
                                    }))
                                }}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>Gi??? m??? c???a :</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RNPickerSelect
                                value={time_start.hour}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n gi???',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    if (value != null) {
                                        setTime_start(item => ({
                                            ...item,
                                            hour: value,
                                        }))
                                        setData(item => ({
                                            ...item,
                                            time_start: time_start.hour + ":" + time_start.min,
                                            time_end: time_end.hour + ":" + time_end.min,
                                        }))
                                    }

                                }}
                                items={list}
                            />
                            <Text>:</Text>
                            <RNPickerSelect
                                value={time_start.min}
                                pickerProps={{
                                    accessibilityLabel: city.id,
                                }}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n ph??t',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    if (value != null) {
                                        setTime_start(item => ({
                                            ...item,
                                            min: value,
                                        }))
                                        setData(item => ({
                                            ...item,
                                            time_start: time_start.hour + ":" + time_start.min,
                                            time_end: time_end.hour + ":" + time_end.min,
                                        }))
                                    }

                                }}
                                items={[
                                    {
                                        label: '00',
                                        value: '00'
                                    },
                                    {
                                        label: '30',
                                        value: '30'
                                    }
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>Gi??? ????ng c???a :</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RNPickerSelect
                                value={time_end.hour}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n gi???',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    if (value != null) {
                                        setTime_end(item => ({
                                            ...item,
                                            hour: value,
                                        }))
                                        setData(item => ({
                                            ...item,
                                            time_start: time_start.hour + ":" + time_start.min,
                                            time_end: time_end.hour + ":" + time_end.min,
                                        }))
                                    }

                                }}
                                items={list}
                            />
                            <Text>:</Text>
                            <RNPickerSelect
                                value={time_end.min}
                                pickerProps={{
                                    accessibilityLabel: city.id,
                                }}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n ph??t',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    if (value != null) {
                                        setTime_end(item => ({
                                            ...item,
                                            min: value,
                                        }))
                                        setData(item => ({
                                            ...item,
                                            time_start: time_start.hour + ":" + time_start.min,
                                            time_end: time_end.hour + ":" + time_end.min,
                                        }))
                                    }

                                }}
                                items={[
                                    {
                                        label: '00',
                                        value: '00'
                                    },
                                    {
                                        label: '30',
                                        value: '30'
                                    }
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>M?? t??? :</Text>
                        </View>
                        <View >
                            <TextInput
                                multiline
                                style={[styles.input, { height: 100 }]}
                                value={data?.description}
                                onChangeText={(text) => {
                                    setData(item => ({
                                        ...item,
                                        description: text
                                    }))
                                }}
                            ></TextInput>
                        </View>
                    </View>

                </View>
                {/* location */}
                <View>
                    <View style={{ marginTop: '3%' }}>
                        <Text style={{ fontSize: 18 }}>Th??ng tin ?????a ch???</Text>
                    </View>
                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>Th??nh ph??? :</Text>
                        </View>
                        <View >
                            <RNPickerSelect
                                value={data.idcity}
                                pickerProps={{
                                    accessibilityLabel: city.id,
                                }}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n th??nh ph???',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    if (value != null) {
                                        setData(item => ({
                                            ...item,
                                            idcity: value
                                        }))
                                        CallAPIdistrict(value, setDistrict)
                                    }

                                }}
                                items={city.map(item => {
                                    let obj = {}
                                    obj.label = item.name
                                    obj.value = item.id
                                    return obj
                                })}

                            />
                        </View>
                    </View>

                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>Qu???n huy???n :</Text>
                        </View>
                        <View>
                            <RNPickerSelect
                                value={data.iddistrict}
                                style={{ backgroundColor: '#ccc' }}
                                placeholder={{
                                    label: 'L???a ch???n qu???n huy???n',
                                    value: null,
                                }}
                                onValueChange={(value) => {
                                    setData(item => ({
                                        ...item,
                                        iddistrict: value
                                    }))
                                }}
                                items={district?.map(item => {
                                    let obj = {}
                                    obj.label = item?.name
                                    obj.value = item?.id
                                    return obj
                                })}
                            />
                        </View>
                    </View>
                    <View style={styles.name}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.title}>?????a ch??? c??? th??? :</Text>
                        </View>
                        <View >
                            <TextInput
                                editable
                                maxLength={40}
                                numberOfLines={4}
                                style={styles.input}
                                value={data.address}
                                onChangeText={(text) => {
                                    setData(item => ({
                                        ...item,
                                        address: text
                                    }))
                                }}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        setData(item => ({
                            ...item,
                            time_start: time_start.hour + ":" + time_start.min,
                            time_end: time_end.hour + ":" + time_end.min,
                        }))
                        Update(data,props.navigation)
                        // Customer(data.idaccount, 'PUT', data).then(res => {
                        //     if (res?.status == 200) {
                        //         alert('Thanh cong')
                        //         props.navigation.popToTop()
                        //     }
                        //     else alert('That bai')
                        // })
                    }}
                >
                    <View style={styles.button}>
                        <Text style={{ color: '#fff' }}>
                            L??U TH??NG TIN
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
        backgroundColor: '#fff',
        height: '100%'
    },
    avatar: {
        width: '100%',
        height: 300
    },
    name: {
        marginTop: '3%',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        color: '#535353',
    },
    input: {
        width: 280,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
    button: {
        marginTop: '3%',
        width: 120,
        height: 50,
        backgroundColor: '#FC6011',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})