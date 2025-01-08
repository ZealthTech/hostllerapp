import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {PURPLE} from '../../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
} from '../../../utils/styles/commonStyles';

const ImageCard = ({title, content, Icon}) => {
  return (
    <View style={styles.container} key={title}>
      <CustomSvg SvgComponent={<Icon />} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginTop: 24,
  },
  title: {
    color: PURPLE,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: 16,

    marginBottom: 5,
  },
  content: {
    fontFamily: MONTSERRAT_REGULAR,
    marginRight: 20,
  },
});
