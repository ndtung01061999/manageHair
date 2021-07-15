import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, SegmentedControlIOS} from 'react-native';
import ReportItem from './item/ReportItem';

const data = [
    {
        'date':1,
        'count':46
    },
    {
        'date':2,
        'count':30
    },
    {
        'date':3,
        'count':23
    },
    {
        'date':4,
        'count':25
    },
]
const ReportScreen = () => {
    console.log(new Date(2021,7,0).getDate()); //28
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={{flexDirection:'row' ,justifyContent:'center'}}>
                <SegmentedControlIOS
                    values={['One', 'Two']}
                    selectedIndex={0}
                    onChange={(event) => {
                        console.log(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
            </View>
            <FlatList
                data={data}
                style={styles.list}
                renderItem={({item}) => {
                    return <ReportItem item={item} />;
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
    button:{
        width:50,
        height: 25,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 20,
        borderRadius: 10
    },
    list:{
        marginLeft: 30,
    }
});
