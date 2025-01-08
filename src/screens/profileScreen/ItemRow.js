import React from 'react';
import {Pressable, Text, View} from 'react-native';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {styles} from './styles';
import {NextArrow} from '../../assets';

const ItemRow = ({
  Icon,
  title,
  content,
  nextReq = true,
  textColor,
  onPress,
}) => {
  return (
    <Pressable style={styles.kycRow} onPress={onPress}>
      <View style={styles.contentView}>
        <CustomSvg SvgComponent={<Icon />} />
        <View>
          <Text style={[styles.titleTxt, textColor]}>{title}</Text>
          {content && <Text style={styles.contentTxt}>{content}</Text>}
        </View>
      </View>
      {nextReq && <CustomSvg SvgComponent={<NextArrow />} />}
    </Pressable>
  );
};
export default ItemRow;
