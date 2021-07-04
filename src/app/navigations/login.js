import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import Getuser from '../api/user/User';
import {useDispatch,useSelector} from 'react-redux';
export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    function id(data) {
        dispatch({
            type: 'LOGIN',
            idaccount: data.id,
            name:data.name,
            password:data.password
        })
    }
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    function check(name, password) {
        if (name == undefined || password == undefined) {
            alert("Tên hoặc mật khẩu chưa nhập")
        }
        else {
           const body={
                    name:name,
                    password:password,
                    type:1
            }
            Getuser('login', 'POST', body).then(res => {
                console.log(res)
                if (name == res.data.name && password == res.data.password) {
                    id(res.data)
                   navigation.replace('Tabs')
                }
                else {
                    alert("Sai tên hoặc mật khẩu")
                }
            })
        }
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={styles.background}
                    source={require('../img/logo.jpg')}
                />
            </View>
            <View style={{ flex: 1 ,alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    placeholder=" Tên tài khoản"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder=" Mật khẩu"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        () => check(name, password)
                    }
                >
                    <View>
                        <Text style={styles.text}>
                            ĐĂNG NHẬP
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ccc', borderColor: '#ccc', }]}
                    onPress={() => {
                        navigation.navigate('Createlogin')
                    }}
                >
                    <View>
                        <Text style={styles.text}>
                            ĐĂNG KÍ
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    },
    background: {
        width: 600,
        height: 300,
        marginBottom: 50,
    },
    input: {
        marginBottom: 5,
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: '#FC6011',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: '#FC6011',
        borderRadius: 10
    },
    text: {
        fontSize: 15,
        color: '#fff'
    }
})