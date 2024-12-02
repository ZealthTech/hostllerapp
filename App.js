import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Navigator from './src/navigation/Navigator';
import {PURPLE} from './src/utils/colors/colors';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const RootWrapper = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigationRef = useRef();

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (
        state?.isInternetReachable === false &&
        state?.isConnected === false
      ) {
        setIsOnline(false);
      } else {
        setIsOnline(true);
      }
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribeNetInfo();
    };
  }, [setIsOnline]);

  useEffect(() => {
    setTimeout(() => {
      if (!isOnline) {
        // showToast(ERROR_TOAST, {
        //   title: strings('common.app.nointernet'),
        //   desc: strings('common.app.nointernetDesc'),
        // });
        console.log('no internet');
      }
    }, 200);
  }, [isOnline]);
  return <Navigator navigationRef={navigationRef} />;
};
const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.safe}>
          <StatusBar barStyle="light-content" backgroundColor={PURPLE} />
        </SafeAreaView>
        <RootWrapper />
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  safe: {flex: 0, backgroundColor: PURPLE},
  view: {flex: 1, backgroundColor: 'white'},
});
export default App;
