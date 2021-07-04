import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import City from '../../../api/location/City';
import District from '../../../api/location/District';
import Customer from '../../../api/customer/Customer'
function CallAPIdistrict(id, setDistrict) {
    District(id, 'GET', null).then(res => {
        setDistrict(res.data)
    })
}
export default function CreateUserScreen(props) {
    const [data, setData] = useState(props.route.params);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    useEffect(() => {
        City(null).then(res => {
            setCity(res.data)
        })
    }, [])
    if (data == null) return null;
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View>
                <Image
                    style={styles.avtar}
                    source={{ uri: data.image }}
                />
            </View>
            {/* application */}
            <View>
                <View style={{ marginTop: '3%' }}>
                    <Text style={{ fontSize: 18 }}>Thông tin cá nhân</Text>
                </View>
                <View style={styles.name}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.title}>Tên :</Text>
                    </View>
                    <View >
                        <TextInput
                            style={styles.input}
                            value={data.name}
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
                        <Text style={styles.title}>SĐT :</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.title, { marginRight: 5 }]}>0</Text>
                        <TextInput
                            style={styles.input}
                            value={data.phone}
                            onChangeText={(text) => {
                                setData(item => ({
                                    ...item,
                                    phone: text
                                }))
                            }}
                        ></TextInput>
                    </View>
                </View>
            </View>
            {/* location */}
            <View>
                <View style={{ marginTop: '3%' }}>
                    <Text style={{ fontSize: 18 }}>Thông tin địa chỉ</Text>
                </View>
                <View style={styles.name}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.title}>Thành phố :</Text>
                    </View>
                    <View >
                        <RNPickerSelect
                            value={data.idcity}
                            pickerProps={{
                                accessibilityLabel: city.id,
                            }}
                            style={{ backgroundColor: '#ccc' }}
                            placeholder={{
                                label: 'Lựa chọn thành phố',
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
                        <Text style={styles.title}>Quận huyện :</Text>
                    </View>
                    <View>
                        <RNPickerSelect
                            value={data.iddistrict}
                            style={{ backgroundColor: '#ccc' }}
                            placeholder={{
                                label: 'Lựa chọn quận huyện',
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
                        <Text style={styles.title}>Địa chỉ cụ thể :</Text>
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
                    Customer(data.idaccount, 'PUT', data).then(res => {
                        if (res?.status == 200) {
                            alert('Thanh cong')
                            props.navigation.popToTop()
                        }
                        else alert('That bai')
                    })
                }}
            >
                <View style={styles.button}>
                    <Text style={{ color: '#fff' }}>
                        LƯU THÔNG TIN
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
        backgroundColor: '#fff',
        height: '100%'
    },
    avtar: {
        width: 100,
        height: 100
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
