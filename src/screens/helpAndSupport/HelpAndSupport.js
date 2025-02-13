import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import Space from '../../components/space/Space';
import {
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  makeCall,
  openWhatsApp,
  sendEmail,
} from '../../utils/constants/commonFunctions';
import {
  BLACK_COLOR,
  GRAY_92,
  TEXT_COLOR,
  WHITE,
} from '../../utils/colors/colors';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {DownArrow} from '../../assets';

const HelpAndSupport = () => {
  const NUMBER = '+918002023999'; //put support phone number here
  const EMAIL_ID = 'info@hostellers.in'; //support email

  return (
    <View style={styles.container}>
      <BackIconHeader title={'24x7 Customer Support'} />
      <Space height={30} />
      <View style={styles.headerView}>
        <View style={styles.leftView}>
          <Text style={styles.helpText}>Help Center</Text>
          <Text style={styles.helpSubText}>
            Please get in touch if you need help from us. {'\n'}Our team is here
            for you! Reach out to us, and we’ll be happy to help.
          </Text>
        </View>
        <Image
          source={require('../../assets/images/help.png')}
          style={styles.Helpimage}
        />
      </View>
      <Space height={10} />
      <View style={styles.itemView}>
        <TouchableOpacity
          style={styles.rowView}
          activeOpacity={1}
          onPress={() => makeCall(NUMBER)}>
          <View style={styles.rowContent}>
            <Image
              source={require('../../assets/images/call.png')}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.title}>Call Us</Text>
              <Text style={styles.subTitle}>{NUMBER}</Text>
            </View>
          </View>
          <CustomSvg
            SvgComponent={<DownArrow height={16} width={16} fill={GRAY_92} />}
            imgStyle={styles.arrow}
          />
        </TouchableOpacity>
        <Space height={16} />
        <TouchableOpacity
          style={styles.rowView}
          activeOpacity={1}
          onPress={() => openWhatsApp(NUMBER)}>
          <View style={styles.rowContent}>
            <Image
              source={require('../../assets/images/whatsapp.png')}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.title}>WhatsApp</Text>
              <Text style={styles.subTitle}>{NUMBER}</Text>
            </View>
          </View>
          <CustomSvg
            SvgComponent={<DownArrow height={16} width={16} fill={GRAY_92} />}
            imgStyle={styles.arrow}
          />
        </TouchableOpacity>
        <Space height={16} />
        <TouchableOpacity
          style={styles.rowView}
          activeOpacity={1}
          onPress={() => sendEmail(EMAIL_ID)}>
          <View style={styles.rowContent}>
            <Image
              source={require('../../assets/images/mail.png')}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.subTitle}>{EMAIL_ID}</Text>
            </View>
          </View>
          <CustomSvg
            SvgComponent={<DownArrow height={16} width={16} fill={GRAY_92} />}
            imgStyle={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {marginLeft: 10},
  rowContent: {flexDirection: 'row', alignItems: 'center'},
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 20,
  },
  image: {height: 25, width: 25},
  title: {color: '#5F5F5F', fontSize: 15, fontFamily: MONTSERRAT_SEMIBOLD},
  subTitle: {
    color: '#5F5F5F',
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 2,
  },
  itemView: {marginHorizontal: 16, marginTop: 20},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  Helpimage: {height: 130, width: 130},
  leftView: {flex: 1, marginTop: 10, marginEnd: 10},
  helpText: {color: BLACK_COLOR, fontSize: 22, fontFamily: MONTSERRAT_SEMIBOLD},
  helpSubText: {
    color: TEXT_COLOR,
    fontSize: 12,
    marginTop: 10,
    fontFamily: MONTSERRAT_REGULAR,
  },
  arrow: {transform: [{rotate: '270deg'}]},
});
