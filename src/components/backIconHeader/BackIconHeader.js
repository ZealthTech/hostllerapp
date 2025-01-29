import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PURPLE, WHITE} from '../../utils/colors/colors';
import {MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';
import CustomSvg from '../customSvg/CustomSvg';
import {BackArrow} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const BackIconHeader = props => {
  const {title, fromCart = false, onPress} = props || {};
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <CustomSvg
        SvgComponent={<BackArrow fill={WHITE} />}
        isClickable={true}
        onPress={() => (fromCart ? onPress : navigation?.goBack())}
      />
      <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>
        {title}
      </Text>
    </View>
  );
};
export default BackIconHeader;
const styles = StyleSheet.create({
  view: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
    paddingVertical: 16,
  },
  text: {
    fontSize: 20,
    color: WHITE,
    flex: 1,
    fontFamily: MONTSERRAT_BOLD,
  },
});
