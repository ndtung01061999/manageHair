import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Onestore} from '../../../api/store/Onestore';
import { useSelector } from 'react-redux';
export default function UserScreen({ navigation }) {
    const account = useSelector(state => state.numberReducer);
    const [data, setData] = useState([]);
    useEffect(() => {
        Onestore(`store/account/${account.idaccount}`, 'GET', null).then(res => {
            setData(res.data)
        })
    },[data])
    if(data==null) return null;
    return (
        <View>
            <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={styles.header}></View>
            <View style={styles.avatars}>
                <Image
                    style={styles.image}
                    source={data?.image==null?require('../../../img/nobody.jpg'):{uri:data.image}}
                />
            </View>
            <View style={styles.information}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '3%' }}>
                    <Text style={styles.text}>
                        Thông tin tài khoản
                    </Text>
                </View>
                <View style={styles.br}></View>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.text}>Loại tài khoản :</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Cửa hàng</Text>
                    </View>
                </View>
                <View style={styles.br}></View>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.text}>Tên tài khoản :</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>
                        {account.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.br}></View>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.text}>Tên cửa hàng:</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>{data?.name}</Text>
                    </View>
                </View>
                <View style={styles.br}></View>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.text}>Mật khẩu:</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={styles.buttonPassword}
                        onPress={()=>{
                            navigation.navigate("UpdatepassScreen",{
                                account
                            })
                        }}
                        >
                            <Text>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>*********</Text>
                    </View>
                </View>
                <View style={styles.br}></View>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.replace('Login')
                    }}
                >
                    <View style={styles.button}>
                        <Text>
                            ĐĂNG XUẤT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FC6011',
        height: 100
    },
    avatars: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    textavtar: {
        fontSize: 25,
        marginTop: '3%'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    applicationcreate: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 100,
        backgroundColor: '#ccc',
        height: 40,
        borderRadius: 5
    },
    information: {
        marginTop: 5,
    },
    text: {
        fontSize: 20
    },
    br: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc'
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: '3%',
        height: 50,
    },
    buttonPassword: {
        backgroundColor: '#ccc',
        marginRight: 5,
        width: 100,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    button: {
        marginTop: 20,
        width: 100,
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
