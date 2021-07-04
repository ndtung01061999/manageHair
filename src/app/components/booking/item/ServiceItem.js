import React,{ useState }  from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
export default function ServiceItem({serviceBooking, item, setTotal, total ,setServicebooking}) {
    const [icon,setIcon]=useState(true);
    const check = () => {
        return serviceBooking.some(e => e === item);
    }
    return (
        <View style={styles.service}>
            <View >
                <Image
                    style={styles.imgService}
                    source={{ uri: item.image }}
                />
            </View>
            <View style={styles.name}>
                <Text style={{ fontSize: 18 }}>
                    {item.nameservice}
                </Text>
                <Text style={{ fontSize: 15, color: '#353535' }}>
                    {item.duration} phut
                </Text>
            </View>
            <View style={styles.cost}>
                <Text style={{ fontSize: 18, paddingRight: '3%' }}>
                    {item.price}.000
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setIcon(!icon);
                        setTotal(icon ? total + item.price : total - item.price);
                        if (check()) {
                            serviceBooking = serviceBooking.filter((e) => {
                                return e !== item;
                            })
                        }
                        else {
                            serviceBooking.push(item);
                        }
                        setServicebooking(serviceBooking);

                    }}
                >
                    <View>
                        <AntDesign name={icon ? 'pluscircleo' : 'checkcircle'} size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    service: {
        marginHorizontal: '3%',
        marginTop: '3%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingRight: '3%'
    },
    imgService: {
        width: 70,
        height: 70,
    },
    name: {
        paddingLeft: '3%',
        justifyContent: 'center',
        flex: 1,
    },
    cost: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
})