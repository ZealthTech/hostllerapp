import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const renderNotifications = ({}) => {};
  return (
    <View style={styles.container}>
      <BackIconHeader title="Notifications" />
      {notifications?.length > 0 ? (
        <FlatList data={notifications} renderItem={renderNotifications} />
      ) : (
        <Text style={styles.noNotification}>No Notifications Found</Text>
      )}
    </View>
  );
};

export default Notifications;
