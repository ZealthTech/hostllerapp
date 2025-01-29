import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BLACK_COLOR,
  GRAY_LIGHT_CB,
  PURPLE,
  WHITE,
} from '../../utils/colors/colors';
import Button from '../button/Button';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
} from '../../utils/styles/commonStyles';

const FooterButton = props => {
  const {onPress, price} = props || {};
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <View>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.price}>₹ {price}</Text>
        </View>
        <Button
          elevation={true}
          containerStyle={styles.button}
          title="Checkout"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    borderTopRightRadius: 25,
    borderWidth: 0.4,
    borderColor: GRAY_LIGHT_CB,
    borderTopLeftRadius: 25,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {marginTop: 0, paddingHorizontal: 30, backgroundColor: PURPLE},
  total: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR},
  price: {fontFamily: MONTSERRAT_BOLD, fontSize: 18, color: BLACK_COLOR},
});
