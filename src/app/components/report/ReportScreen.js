import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import RNPickerSelect from 'react-native-picker-select';
import ReportItem from './item/ReportItem';
import {Onestorereport} from '../../api/store/Onestore';
const month= [
    { label: 'Tháng 1', value: 1 },
    { label: 'Tháng 2', value: 2 },
    { label: 'Tháng 3', value: 3 },
    { label: 'Tháng 4', value: 4 },
    { label: 'Tháng 5', value: 5 },
    { label: 'Tháng 6', value: 6 },
    { label: 'Tháng 7', value: 7 },
    { label: 'Tháng 8', value: 8 },
    { label: 'Tháng 9', value: 9 },
    { label: 'Tháng 10', value: 10 },
    { label: 'Tháng 11', value: 11 },
    { label: 'Tháng 12', value: 12 },
]
const ReportScreen = () => {
    const [data,setData] =useState();
    const [type,setType] =useState(1);
    const [monthactive, setMonthactive] =useState(new Date().getMonth()+1);
    useEffect(() =>{
        console.log(type);
        Onestorereport(1, 'POST' , {
            'type': type,
            'date' : `2021-${monthactive}-10`
        }).then(res =>{
            console.log(res);
            setData(res.data)
            console.log(res.data);
        })
    },[type,monthactive])
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={{flexDirection:'row' ,justifyContent:'center'}}>
                <SegmentedControl
                    style={{width: 300, marginBottom: 30}}
                    tintColor={'#FC6011'}
                    activeFontStyle={{
                        color:'#fff',
                    }}
                    values={['Ngày', 'Tháng']}
                    selectedIndex={0}
                    onChange={event => {
                        setType(event.nativeEvent.selectedSegmentIndex+1);
                    }}
                />
            </View>
            {
                type == 1 ?
                <View style={styles.calander}>
                    <RNPickerSelect
                        value={monthactive}
                        placeholder={{
                            label: 'Lựa chọn tháng',
                            value: null,
                        }}
                        onValueChange={(value) => setMonthactive(value)}
                        items={month}
                    />
                </View>
                    : null
            }
            {
                data?.length == 0 ?
                    <View style={{marginTop: 150,alignItems:'center'}}>
                        <Text style={{fontSize:20}}>Không có lịch đặt</Text>
                    </View>
                    :
                    <FlatList
                        data={data}
                        style={styles.list}
                        keyExtractor={(item) => item.date}
                        renderItem={({item}) => {
                            return <ReportItem item={item} type={type} monthactive={monthactive}/>;
                        }}
                    />
            }

        </View>
    );
};

export default ReportScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    calander:{
        marginLeft: 30,
        marginBottom: 20,
    },
    list:{
        marginLeft: 30,
    },

});
