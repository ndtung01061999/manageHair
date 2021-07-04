import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ServiceItem from './item/ServiceItem';
import { FloatingAction } from "react-native-floating-action";

import { Onestoreservice } from '../../../api/store/Onestore';
import Modalcreate from './item/Modalcreate';

const CallAPI=(idstore,setData)=>{
    Onestoreservice(`${idstore}`, 'GET', null).then(res => {
        setData(res.data)
    })
}
const createTwoButtonAlert = (itemactive,idstore,setData) => {
    Alert.alert(
        "Xoá dịch vụ",
        `xoá dịch vu:${itemactive.nameservice}`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => {
                Onestoreservice(itemactive.id,'DELETE',null).then(res=>{
                   if(res?.status==200)
                   {
                    alert('Thanh cong')
                    CallAPI(idstore,setData)
                   } 
                   else alert('That bai')
                })
            } }
        ]
    );
}
export default function Service({ idstore }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [itemactive, setItemactive] = useState();
    const [data, setData] = useState([]);
    const [type, setType] = useState();
    useEffect(() => {
        if (idstore != undefined) {
            Onestoreservice(`${idstore}`, 'GET', null).then(res => {
                setData(res.data)
            })
        }

    },[])
    const actions = [
        {
            text: "Thêm",
            icon: require('../../../img/plus.png'),
            name: "btplus",
            position: 1,
            color: '#FC6011'
        },
        {
            text: "Sửa",
            icon: require('../../../img/update.png'),
            name: "btupdate",
            position: 2,
            color: '#FC6011'
        },
        {
            text: "xoá",
            icon: require("../../../img/delete.png"),
            name: "btdelete",
            position: 3,
            color: '#FC6011'
        }
    ];
    if (data == null) return null;
    return (
        <View style={styles.container}>
            <View style={styles.services}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (<ServiceItem item={item} itemactive={itemactive} setItemactive={setItemactive} />)}
                    keyExtractor={item => item.id}
                />
            </View>
            <FloatingAction
                color='#FC6011'
                actions={actions}
                onPressItem={name => {
                    if (name === 'btdelete')
                        if (itemactive == null) alert("Chưa chọn dịch vụ")
                        else createTwoButtonAlert(itemactive,idstore,setData)
                    else if (name === 'btplus') {
                        setItemactive(null);
                        setModalVisible(true)
                        setType(1);
                    }
                    else {
                        if (itemactive == null) alert("Chưa chọn dịch vụ")
                        else {
                            setType(2);
                            setModalVisible(true)
                        }

                    }
                }}
            />
            <Modalcreate modalVisible={modalVisible} setModalVisible={setModalVisible} item={itemactive} setItemactive={setItemactive} data={data} type={type} idstore={idstore} setData={setData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    services: {
        margin: '3%'
    },

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