import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
const ReportItem = ({item}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text>{item.date}/7:</Text>
            <View style={[styles.total, {width: item.count * 5}]} />
            <Text>{item.count}</Text>
        </View>
    );
};
export default ReportItem
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
    },
    total: {
        width: 500,
        height: 30,
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});
