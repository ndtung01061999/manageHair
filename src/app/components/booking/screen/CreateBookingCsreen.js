import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity ,Alert} from 'react-native';
import ServiceItem from '../item/ServiceItem';
import { Onestoreservice } from '../../../api/store/Onestore';
import Createbooking from '../../../api/booking/Createbooking';
import Timelineservice from '../../../api/store/Timelineservice';
import Timeline from '../item/TimelineItem';
function checkwashhair(services) {
    let kt = 0;
    for (let i = 0; i < services.length; i++) {
        if (services[i].nameservice == "Gội đầu") {
            kt = 1;
            break;
        }
    }
    return kt;
}
function checkcuthair(services) {
    let kt = 0;
    for (let i = 0; i < services.length; i++) {
        if (services[i].nameservice == "Cắt tóc" || services[i].nameservice == "Nhuộm tóc") {
            kt = 1;
            break;
        }
    }
    return kt;
}
function createdetail(timeone, timetwo, date, services) {
    const listdetail = [];
    if (timeone == null) {
        let detail = {
            "idstore_service": services[0].id,
            "time": timetwo?.number,
            "date": date
        }
        listdetail.push(detail)
    }
    else if (timetwo == null) {
        for (let i = 0; i < services.length; i++) {
            let detail = {
                "idstore_service": services[i].id,
                "time": timeone?.number,
                "date": date
            }
            listdetail.push(detail);
        }
    }
    else {
        for (let i = 0; i < services.length; i++) {
            if (services[i].nameservice == "Gội đầu") {
                let detail = {
                    "idstore_service": services[i].id,
                    "time": timetwo?.number,
                    "date": date
                }
                listdetail.push(detail);
            }
            else {
                let detail = {
                    "idstore_service": services[i].id,
                    "time": timeone?.number,
                    "date": date
                }
                listdetail.push(detail);
            }
        }

    }
    return listdetail
}
export default function CreateBookingCreen(props) {
    const url = `store/equipment/${props.route.params.id}`;
    const [total, setTotal] = useState(0);
    const [servicebooking, setServicebooking] = useState([]);
    const [service, setService] = useState([]);
    const [itemActiveone, setItemActiveone] = useState(null);
    const [itemActivetwo, setItemActivetwo] = useState(null);
    const [timelineone, setTimelineone] = useState([]);
    const [timelinetwo, setTimelinetwo] = useState([]);
    useEffect(() => {
        Onestoreservice(props.route.params.id, 'GET', null).then(res => {
            setService(res.data);
        })
        Timelineservice(`${url}/1/${props.route.params.date}`, 'GET', null).then(res => {
            setTimelineone(res.data);
        });
        Timelineservice(`${url}/2/${props.route.params.date}`, 'GET', null).then(res => {
            setTimelinetwo(res.data);
        })
    }, []);
    const createTwoButtonAlert = () => {
        Alert.alert(
            "Xác nhận",
            "Xác nhận đặt lịch",
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let list = await createdetail(itemActiveone, itemActivetwo, props.route.params.date, service)
                        console.log(list);
                        await Createbooking('POST', {
                            "idaccount": props.route.params.id,
                            "listdetail": list
                        }).then(res => {
                            if (res?.status == 200) {
                                Alert.alert("Thanh cong");
                                props.navigation.replace('BookingScreen')
                            }
                            else Alert.alert("that bai");
                        })

                    }
                }
            ]
        );
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={styles.title}>
                <Text style={styles.text}>Thêm lịch đặt</Text>
            </View>
            <View style={styles.services}>
                <FlatList
                    data={service}
                    renderItem={({ item }) =>
                        <ServiceItem serviceBooking={servicebooking} total={total} setTotal={setTotal} item={item} setServicebooking={setServicebooking} />}
                    keyExtractor={item => item?.id}
                />
            </View>
            <View style={styles.times}>
                <View>
                    <Text style={{ fontSize: 15, marginBottom: '3%' }}>
                        Chọn giờ
                    </Text>
                </View>
                <View style={styles.time}>
                    <View style={styles.morning}>
                        <View>
                            <Text style={{ color: '#535353' }}>
                                Cắt tóc/ nhuộm tóc
                            </Text>
                        </View>
                        {checkcuthair(servicebooking) == 0 ?
                            <View style={{ alignItems: 'center', marginTop: 30 }}>
                                <Text style={{ fontSize: 15 }}>Không chọn dịch vụ cắt tóc/ gội đầu</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList
                                    horizontal={true}
                                    data={timelineone}
                                    renderItem={({ item }) => {
                                        return <Timeline
                                            itemActive={itemActiveone}
                                            setItemActive={setItemActiveone}
                                            item={item}
                                            itemcheck={null}
                                        />
                                    }}
                                    keyExtractor={item => item?.id}
                                />
                            </View>
                        }
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#ccc' }}></View>
                    <View style={styles.noon}>
                        <View>
                            <Text style={{ color: '#535353' }}>
                                Gội đầu
                            </Text>
                        </View>
                        {checkwashhair(servicebooking) == 0 ?
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 15 }}>Không chọn dịch vụ gội đầu</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList
                                    horizontal={true}
                                    data={timelinetwo}
                                    renderItem={({ item }) => {
                                        return <Timeline
                                            itemActive={itemActivetwo}
                                            item={item}
                                            setItemActive={setItemActivetwo}
                                            itemcheck={itemActiveone}
                                        />
                                    }}
                                    keyExtractor={item => item?.id}
                                />
                            </View>
                        }
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    createTwoButtonAlert()
                }}
            >
                <Text style={{fontSize:30,color:'#fff'}}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    title: {
        height: 50,
        backgroundColor: '#FC6011',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 17,
        color: '#fff'
    },
    times: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    time: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
    },
    morning: {
        margin: 5,
        height: 95,
    },
    noon: {
        margin: 5,
        height: 95
    },
    button: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FC6011',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        margin:30
    },
})