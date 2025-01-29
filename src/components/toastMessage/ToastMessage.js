// ToastMessage.js
import React from 'react';
import {View, Text} from 'react-native';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import {
  BLACK_COLOR,
  LIGHT_GREEN,
  RED_DARK,
  WHITE,
} from '../../utils/colors/colors';
import CustomSvg from '../customSvg/CustomSvg';
import {Cancel, CheckGreen} from '../../assets';
import {MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';

const ToastMessage = ({type, title, desc, info}) => {
  console.log('type, title ', type, title);
  const styles = getStyles(type);
  return (
    <View style={[styles.toastContainer(info)]}>
      <View style={styles.row}>
        {type === SUCCESS_TOAST ? (
          <CustomSvg SvgComponent={<CheckGreen height={28} width={28} />} />
        ) : (
          <CustomSvg SvgComponent={<Cancel height={28} width={28} />} />
        )}
        <View>
          <Text style={styles.desc(info)}>{desc}</Text>
        </View>
      </View>

      <View style={styles.line(info)} />
    </View>
  );
};

const getStyles = type => {
  switch (type) {
    case SUCCESS_TOAST:
      return {
        toastContainer: info => ({
          borderRadius: 5,
          width: '80%',
          marginBottom: 30,
          overflow: 'hidden',
          backgroundColor: info ? BLACK_COLOR : WHITE,
        }),
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
        },
        title: {fontWeight: 'bold', color: BLACK_COLOR, paddingHorizontal: 10},
        desc: info => ({
          color: info ? WHITE : BLACK_COLOR,
          fontFamily: MONTSERRAT_REGULAR,
        }),
        line: info => ({height: 4, backgroundColor: LIGHT_GREEN}),
      };
    case ERROR_TOAST:
      return {
        toastContainer: info => ({
          borderRadius: 5,
          width: '80%',
          marginBottom: 30,
          overflow: 'hidden',
          backgroundColor: info ? BLACK_COLOR : WHITE,
        }),
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
        },
        title: {fontWeight: 'bold', color: BLACK_COLOR, paddingHorizontal: 10},
        desc: info => ({
          color: info ? WHITE : BLACK_COLOR,
          fontFamily: MONTSERRAT_REGULAR,
        }),
        line: _info => ({height: 4, backgroundColor: RED_DARK}),
      };
    default:
      return {
        toastContainer: info => ({
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }),
        title: {fontWeight: 'bold', color: BLACK_COLOR},
        desc: info => ({color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR}),
      };
  }
};

export default ToastMessage;
