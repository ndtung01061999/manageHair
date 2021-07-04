import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import RNPickerSelect from 'react-native-picker-select';
import { Onestoresequipment } from '../../../api/store/Onestore';

function Create(id, body, setModalVisible,setTable,setData) {
    Onestoresequipment(id, 'POST', body).then(res => {
        if (res?.status == 200){
            CallAPI(setTable,id,setData)
            alert("Thành công")
        }
           
        else alert("Thất bại")
        setModalVisible(false)
    })

}
function Delete(id, body,setModalVisible,setTable,setData) {
    Onestoresequipment(id, 'PUT', body).then(res => {
        if (res?.status == 200) {
            CallAPI(setTable,id,setData)
            alert("Thành công")
        }
        else alert("Thất bại")
        setModalVisible(false)
    })
}
function CallAPI(setTable,idstore,setData) {
    Onestoresequipment(`${idstore}`, 'GET', null).then(res => {
        setData(res.data)
        setTable({
            tableHead: ['Loại', 'Số lượng'],
            tableData: [
                ['Cắt tóc/nhuộm tóc', res.data[0]?.numberOf],
                ['Gội đầu', res.data[1]?.numberOf],
            ]
        })
    })
}
export default function Equipment({ idstore }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [equipment, setEquipment] = useState();
    const [table, setTable] = useState({})
    const [data,setData]=useState();
    useEffect(() => {
        if (idstore != undefined){
            CallAPI(setTable,idstore,setData)
        }   
    }, [])
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={table.tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={table.tableData} textStyle={styles.text} />
            </Table>
            <TouchableOpacity
                onPress={() => { setModalVisible(true) }}
            >
                <View style={styles.button}>
                    <Text>Chỉnh sửa</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.select}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Lựa chọn loại ghế'
                                }}
                                onValueChange={(value) => setEquipment(item => ({
                                    ...item,
                                    type: value
                                }))}
                                items={[
                                    { label: 'Cắt tóc/nhuộm tóc', value: '1' },
                                    { label: 'Gội đầu', value: '2' },
                                ]}
                            />
                        </View>
                        <View style={styles.textinput}>
                            <TextInput
                                onChangeText={(value) => setEquipment(item => ({
                                    ...item,
                                    numberOf: value
                                }))}
                                placeholder='nhập số lượng' />
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (equipment?.type == null || equipment?.numberOf == null) alert("Chưa nhập loại hoặc số lượng")
                                    else Create(idstore, equipment, setModalVisible,setTable,setData);
                                }}
                            >
                                <View style={[styles.buttonmodal, { backgroundColor: '#FC6011' }]}>
                                    <Text>Thêm</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (equipment?.type == null || equipment?.numberOf == null) alert("Chưa nhập loại hoặc số lượng")
                                    else{
                                        if (equipment.type == 1 && equipment.numberOf < data[0].numberOf) {
                                        Delete(idstore, equipment, setModalVisible,setTable,setData);
                                    }
                                    else if (equipment.type == 2 && equipment.numberOf < data[1].numberOf) {
                                        Delete(idstore, equipment, setModalVisible,setTable,setData);
                                    }
                                    else alert("Số lượng quá lớn")
                                    }
                                }}
                            >
                                <View style={[styles.buttonmodal, { backgroundColor: 'yellow' }]}>
                                    <Text>Xoá</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false)
                                    setEquipment(null);
                                }}
                            >
                                <View style={styles.buttonmodal}>
                                    <Text>Huỷ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '3%',
        paddingTop: '25%',
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#808B97'
    },
    text: {
        margin: 6
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#FFF1C1'
    },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    },
    button: {
        width: '100%',
        height: 40,
        marginTop: '3%',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: '3%',
        //alignItems: "center",
    },
    modalView: {
        // margin: 20,
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
        marginBottom: '3%',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonmodal: {
        width: 70,
        height: 30,
        backgroundColor: '#ccc',
        marginHorizontal: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})