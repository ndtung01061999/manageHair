import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
const ReportItem = ({item, type}) => {
    return (
        <View style={{flexDirection: 'row' , marginBottom : 10, height: 30}}>
            <View style={{justifyContent:'center' , alignItems:'center'}}>
                <Text>{type==2 ? 'Tháng' : null} {item.date} { type==1 ? '/7' : null }:</Text>
            </View>
            <View style={[styles.total, {width: item.count * 10}]} />
            <View style={{justifyContent:'center' , alignItems:'center'}}>
                <Text>{item.count}</Text>
            </View>
        </View>
    );
};
export default ReportItem
const styles = StyleSheet.create({
    total: {
        justifyContent:'center' ,
        alignItems:'center',
        width: 500,
        height: '100%',
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        borderRadius: 5,
    },
});
