import {Image, ImageBackground, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {HandShake, HomeIcon, PersonStar} from '../../../assets';
import {styles} from './styles';

const LeadBanners = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.whiteText}>
            Want<Text style={styles.yellowText}> Guests Who Love Hostels?</Text>{' '}
            We've Got Them
          </Text>
          <Text style={styles.fillText}>
            Fill Your Hostel WIth Travellers Who Love To Socialize And Spend
            More.
          </Text>
        </View>
        <ImageBackground
          source={require('../../../assets/images/bannerBackground.png')}
          style={styles.backImg}>
          <Image
            source={require('../../../assets/images/lead_banner.png')}
            style={styles.image}
          />
        </ImageBackground>
      </View>
      <View style={styles.secondView}>
        <Text style={styles.owners}>For Property Owners</Text>
        <Text style={styles.rent}>Rent Your Property For Free</Text>
        <View style={styles.iconView}>
          <View style={styles.iconCard}>
            <CustomSvg SvgComponent={<HomeIcon />} />
            <Text style={styles.count}>25,000+</Text>
            <Text style={styles.house}>House</Text>
            <Text style={styles.house}>Rented</Text>
          </View>
          <View style={styles.iconCard}>
            <CustomSvg SvgComponent={<PersonStar />} />
            <Text style={styles.count}>15,000+</Text>
            <Text style={styles.house}>Happy</Text>
            <Text style={styles.house}>Customer</Text>
          </View>
          <View style={styles.iconCard}>
            <CustomSvg SvgComponent={<HandShake />} />
            <Text style={styles.count}>25,000+</Text>
            <Text style={styles.house}>Home Owners</Text>
            <Text style={styles.house}>Trust Us</Text>
          </View>
        </View>
      </View>
      <ImageBackground
        source={require('../../../assets/images/lead_background.png')}
        style={styles.backImgLead}>
        <View style={styles.txtView}>
          <Text style={styles.callTxt}>
            Call Us On +91 XXXXX XXXXX To Get Help with your Property
          </Text>
        </View>
        <Text style={[styles.owners, styles.free]}>
          List Your Property For FREE In These 3 Simple Steps
        </Text>
        <View style={styles.imgView}>
          <Image source={require('../../../assets/images/step1.png')} />
          <Image source={require('../../../assets/images/step2.png')} />
          <Image source={require('../../../assets/images/step3.png')} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LeadBanners;
