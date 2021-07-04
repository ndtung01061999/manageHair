import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet ,Alert} from 'react-native';

const alert = (time) =>
    Alert.alert(
      "Giờ không hợp lệ",
     "cầu phải chọn giờ gội đầu sau cắt tóc",
      [
        { text: "đồng ý", onPress: () => console.log("OK Pressed") }
      ]
    );
export default function Timeline({ item, itemActive, setItemActive, itemcheck }) {
    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    if(itemcheck?.id>=item.id){
                        alert()
                    }
                    else{
                        setItemActive(item);
                    }
                    
                }
                }
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.itemtime, (itemcheck?.id >= item.id) ? styles.colorchoose : ((itemActive === item) ? { backgroundColor: '#FC6011' } : { backgroundColor: '#fff' })]}>
                        <Text>{item.time}</Text>
                        <Text style={{ color: '#535353' }}>Còn {item.number} chỗ</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    itemtime: {
        marginTop: '3%',
        marginRight: 10,
        borderWidth: 1,
        width: 100,
        height: 50,
        borderColor: '#535353',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    colorchoose: {
        backgroundColor: '#ccc'
    }
})