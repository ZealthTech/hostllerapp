import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {CrossIcon} from '../../assets';
import {PURPLE, WHITE} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';

const BottomSheetHeader = ({onClose, title}) => {
  return (
    <View style={styles.sheetHead}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.crossTch} onPress={onClose}>
        <CustomSvg SvgComponent={<CrossIcon fill="white" />} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
  sheetHead: {
    backgroundColor: PURPLE,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: fontsSize.fs18},
  crossTch: {padding: 5},
});
