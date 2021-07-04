import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Onestoreservice} from '../../../../api/store/Onestore'
const choosePhoto = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {
        console.log(image);
    });
}
const CallAPI=(idstore,setData)=>{
    Onestoreservice(`${idstore}`, 'GET', null).then(res => {
        setData(res.data)
    })
}
const Changeservice=(item,type,idstore,setData)=> {
    if(type==1){
        Onestoreservice(idstore,'POST',item).then(res=>{
            if(res?.status==200){
                CallAPI(idstore,setData)
                alert("Thanh cong")
            }
            else alert("That bai")
        })
    }
    else{
        Onestoreservice(item.id,'PUT',item).then(res=>{
            if(res?.status==200){
                CallAPI(idstore,setData)
                alert("Thanh cong")
            }
            else alert("That bai")
        })
    }
}
export default function Modalcreate({ item, modalVisible, setModalVisible, setItemactive, type ,idstore,setData}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.select}>
                        {
                            type==1?
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Lua chon dich vu',
                                    value: null
                                }}
                                value={item?.id}
                                onValueChange={(value) =>
                                    setItemactive(item => ({
                                        ...item,
                                        id: value
                                    }))
                                }
                                items={[
                                    { label: 'Cắt tóc', value: '1' },
                                    { label: 'Gội đầu', value: '2' },
                                    { label: 'Nhuộm tóc', value: '3' },
                                ]}
                            />
                            :
                            <Text>{item?.nameservice}</Text>
                        }

                    </View>
                    <View style={styles.textinput}>
                        <TextInput
                            value={item?.price}
                            onChangeText={(text) => {
                                setItemactive(item => ({
                                    ...item,
                                    price: text
                                }))
                            }}
                            placeholder='nhập giá tiền' />
                    </View>
                    <TouchableOpacity
                        onPress={choosePhoto}
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: item?.image }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Chon anh</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '3%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                Changeservice(item,type,idstore,setData)
                                setModalVisible(false)
                            }}
                        >
                            <View style={styles.button}>
                                <Text>DONG Y</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false)
                            }}
                        >
                            <View style={[styles.button, { backgroundColor: '#ccc' }]}>
                                <Text>HUY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        marginHorizontal: '10%'
    },
    modalView: {
        margin: '3%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    select: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%'
    },
    textinput: {
        width: '100%',
        height: 30,
        backgroundColor: '#ccc',
        marginBottom: '3%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 40,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC6011',
        borderRadius: 10
    },
})