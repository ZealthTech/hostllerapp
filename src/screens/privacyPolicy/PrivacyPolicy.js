import {ScrollView, useWindowDimensions, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {apiGet} from '../../network/axiosInstance';
import {CMS_DETAIL} from '../../utils/constants/apiEndPoints';
import Loader from '../../components/loader/Loader';
import RenderHTML from 'react-native-render-html';
import {styles} from './styles';
import Space from '../../components/space/Space';
const PrivacyPolicy = navigation => {
  const route = navigation?.route || {};
  const {slug, userData} = route.params || {};
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();
  useEffect(() => {
    getCmsData();
  }, [getCmsData]);

  const getCmsData = useCallback(async () => {
    const response = await apiGet(
      CMS_DETAIL + slug,
      {userId: userData?.userId},
      userData?.token,
    );
    if (response?.status) {
      setData(response?.data);
    }
    setLoading(false);
  }, [slug, userData]);

  const htmlContent = data?.description;

  return (
    <View style={styles.container}>
      <BackIconHeader title="Privacy Policy" />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <RenderHTML
          contentWidth={width}
          source={{html: htmlContent}}
          tagsStyles={styles.htmlTagStylesRecom}
          systemFonts={['Montserrat-Regular', 'Montserrat-Bold']}
        />
      </ScrollView>
      <Loader loading={loading} />
    </View>
  );
};

export default PrivacyPolicy;
