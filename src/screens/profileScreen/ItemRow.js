import React from 'react';
import {Pressable, Text, View} from 'react-native';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {styles} from './styles';
import {DownArrow, NextArrow} from '../../assets';
import {GRAY_92, GRAY_LIGHT, ORANGE_DARK} from '../../utils/colors/colors';

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
        <CustomSvg SvgComponent={<Icon stroke={ORANGE_DARK} />} />
        <View>
          <Text style={[styles.titleTxt, textColor]}>{title}</Text>
          {content && <Text style={styles.contentTxt}>{content}</Text>}
        </View>
      </View>
      {nextReq && (
        <CustomSvg
          SvgComponent={<DownArrow fill={GRAY_92} />}
          imgStyle={styles.arrowStyle}
        />
      )}
    </Pressable>
  );
};
export default ItemRow;
