import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, SegmentedControlIOS} from 'react-native';
import ReportItem from './item/ReportItem';
import {Onestorereport} from '../../api/store/Onestore';
const ReportScreen = () => {
    const [data,setData] =useState();
    const [type,setType] =useState(1);
    useEffect(() =>{
        console.log(type);
        Onestorereport(1, 'POST' , {
            'type': type,
            'date' : '2021-05-10'
        }).then(res =>{
            console.log(res);
            setData(res.data)
            console.log(res.data);
        })
    },[type])
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={{flexDirection:'row' ,justifyContent:'center'}}>
                <SegmentedControlIOS
                    style={{width: 100, marginBottom: 30 ,justifyContent:'center',alignItems:'center'}}
                    tintColor={'#FC6011'}
                    values={['Ngày', 'Tháng']}
                    selectedIndex={0}
                    onChange={event => {
                        setType(event.nativeEvent.selectedSegmentIndex+1);
                    }}
                />
            </View>
            <View style={styles.calander}>
                <Text>Tháng</Text>
            </View>
            <FlatList
                data={data}
                style={styles.list}
                renderItem={({item}) => {
                    return <ReportItem item={item} type={type}/>;
                }}
            />
        </View>
    );
};

export default ReportScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    calander:{
        marginLeft: 30,
    },
    list:{
        marginLeft: 30,
    },

});
