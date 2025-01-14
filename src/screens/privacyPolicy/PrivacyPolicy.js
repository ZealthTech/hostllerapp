import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <BackIconHeader title="Privacy Policy" />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text>Here are our privacy policies</Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {flex: 1},
  heading: {fontSize: 18, fontFamily: MONTSERRAT_BOLD},
  contentContainer: {padding: 16},
});
