import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {RightTick} from '../../assets';
import {BLACK_COLOR, GRAY_92, ORANGE_DARK} from '../../utils/colors/colors';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const TermsAndConditionTxt = props => {
  const {agreeTermsAndCondition, agreeTAndC, onPressTAndC, container} =
    props || {};
  return (
    <View style={[styles.termPolicyView, container]}>
      <Pressable onPress={agreeTermsAndCondition} style={styles.pressView}>
        <View style={styles.rightIconContainer}>
          {agreeTAndC && (
            <CustomSvg
              SvgComponent={
                <RightTick height={15} width={15} fill={ORANGE_DARK} />
              }
            />
          )}
        </View>
        <Text style={styles.agree}>I Agree to the</Text>
      </Pressable>
      <Pressable style={styles.agree} onPress={onPressTAndC}>
        <Text style={styles.terms}>Terms & Conditions</Text>
      </Pressable>
    </View>
  );
};

export default TermsAndConditionTxt;

const styles = StyleSheet.create({
  agree: {fontSize: 12, fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR},
  termPolicyView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginStart: 20,
  },
  rightIconContainer: {
    borderWidth: 1,
    borderColor: GRAY_92,
    padding: 1,
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  terms: {
    color: ORANGE_DARK,
    fontSize: 12,
    fontFamily: MONTSERRAT_SEMIBOLD,
    textDecorationLine: 'underline',
  },
  pressView: {flexDirection: 'row', alignItems: 'center', gap: 10},
});
