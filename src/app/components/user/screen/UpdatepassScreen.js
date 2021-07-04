import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import User from '../../../api/user/User';
import { useDispatch } from 'react-redux';
function check(account, passwordNew, dispatch,navigation) {
    if (passwordNew.new1 == passwordNew.try) {
        const trypass = {
            password: passwordNew.new1,
        }
        User(account.idaccount, 'PUT', trypass).then(res => {
            if(res?.status==200){
                alert("Thanh cong")
                navigation.popToTop()
            }
        })
        dispatch({
            type: 'LOGIN',
            idaccount: account.idaccount,
            name: account.name,
            password: passwordNew.new1
        })
    }
    else {
        alert("Nhập lại mật khẩu sai")
    }
}

export default function UpdatepassScreen(props) {
    const dispatch = useDispatch();
    const [account, setAccount] = useState(props.route.params.account)
    const [passwordNew, setPasswordNew] = useState({
        old: '',
        new1: '',
        try: '',
    })
    //console.log(pas)
    return (
        <View style={styles.containr}>
            <SafeAreaView />
            <View style={{ alignItems: 'center', marginTop: 100 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setPasswordNew(item => ({
                            ...item,
                            old: text
                        }))
                    }}
                    placeholder=" Mật khẩu cũ"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setPasswordNew(item => ({
                            ...item,
                            new1: text
                        }))
                    }}
                    placeholder=" Mật khẩu mới"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setPasswordNew(item => ({
                            ...item,
                            try: text
                        }))
                    }}
                    placeholder=" Nhập lại mật khẩu"
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        if (account.password == passwordNew.old) {
                            check(account, passwordNew, dispatch,props.navigation)
                        }
                        else {
                            alert("Nhập sai mật khẩu")
                        }
                    }}
                >
                    <Text>
                        Đổi mật khẩu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containr: {

    },
    input: {
        marginBottom: 5,
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: '#ccc'
    },
    button: {
        marginTop: 10,
        width: 100,
        height: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})