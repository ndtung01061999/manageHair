import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Service from './service/Service';
import Equipment from './equipment/Equipment';
import Store from './Infostore/store';
import { Onestore } from '../../api/store/Onestore';
import { useSelector } from 'react-redux';
export default function StoreScreen({ navigation }) {
  const account = useSelector(state => state.numberReducer);
  const [data, setData] = useState([]);
  useEffect(() => {
    Onestore(`store/account/${account.idaccount}`, 'GET', null).then(res => {
      setData(res.data)
    })
  }, [])
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'store', title: 'Thông tin' },
    { key: 'service', title: 'dịch vụ' },
    { key: 'equipment', title: 'Thiết bị' },
  ]);
  const renderScene = SceneMap({
    store: () => {
      if (data != null) return <Store idaccount={account.idaccount} navigation={navigation} />
    },
    service: () => { if (data != null) return <Service idstore={data.id} /> },
    equipment: () => { if (data != null) return <Equipment idstore={data.id} /> },
  });
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
      <TabView
        renderTabBar={
          props => <TabBar
            {...props}
            style={{ backgroundColor: '#FC6011' }}
          />
        }
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      //initialLayout={{ backgroundColor: '#FC6011' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
