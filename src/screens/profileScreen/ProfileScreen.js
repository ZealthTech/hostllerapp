import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {apiGet, postDataWithImages} from '../../network/axiosInstance';
import {
  PROFILE_DETAIL,
  UPDATE_PROFILE_IMAGE,
} from '../../utils/constants/apiEndPoints';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Camera, Inbox, Kyc, Logout, Phone, Policy} from '../../assets';
import Space from '../../components/space/Space';
import {ORANGE_DARK} from '../../utils/colors/colors';
import ItemRow from './ItemRow';
import Loader from '../../components/loader/Loader';
import PhotoSelectionModal from '../../components/photoSelectionModal/PhotoSelectionModal';
import {
  requestCameraPermission,
  showToast,
} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import ImagePicker from 'react-native-image-crop-picker';
import {KYC_DETAILS_SCREEN} from '../../navigation/routes';
import Button from '../../components/button/Button';

const ProfileScreen = navigation => {
  const {userInfo} = useSelector(state => state.userInfoReducer);
  console.log('userInfo ', userInfo);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    getProfileDetail();
  }, [getProfileDetail]);
  const getProfileDetail = useCallback(async () => {
    const response = await apiGet(PROFILE_DETAIL, {}, userInfo?.token);
    if (response?.status) {
      setUserData(response?.data);
      console.log('response?.data ', response?.data);
    }
    setLoading(false);
  }, [userInfo]);

  const goItemDetail = () => {
    navigation?.navigation?.navigate(KYC_DETAILS_SCREEN, {userData: userInfo});
  };
  const logout = () => {};

  const selectFromGallery = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        return;
      }
      //set timeout to resolve automatically closed gallery in ios
      setTimeout(async () => {
        const image = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        });
        if (image) {
          setSelectedImage(image); // Add selected images to state
          sendImageToServer(image);
        }
      }, 1000);
    } catch (error) {
      showToast(ERROR_TOAST, error);
    }
  };

  const takePhoto = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        return;
      }
      //set timeout to resolve automatically closed camera
      setTimeout(async () => {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        if (image) {
          setSelectedImage(image); // Add selected images to state
          sendImageToServer(image);
        }
      }, 1000);
    } catch (error) {
      showToast(ERROR_TOAST, error);
    }
  };

  const sendImageToServer = async image => {
    const formData = new FormData();
    formData.append('userImage', {
      uri: image?.path,
      type: image?.mime || 'image/jpeg',
      name: 'userUpdatedProfile.jpg',
    });
    formData.append('userId', userInfo?.userId);
    const sendImageResponse = await postDataWithImages(
      UPDATE_PROFILE_IMAGE,
      formData,
      userInfo?.token,
    );
    if (sendImageResponse?.status) {
      showToast(SUCCESS_TOAST, sendImageResponse?.message);
    } else {
      showToast(ERROR_TOAST, sendImageResponse?.message);
    }
  };
  const onPressTakePhoto = () => {
    takePhoto();
    setModal(false);
  };

  const onPressChooseFromGallery = () => {
    selectFromGallery();
    setModal(false);
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title="Profile" />
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                selectedImage === ''
                  ? userData?.userImage
                  : selectedImage?.path,
            }}
            style={styles.image}
          />
          <Pressable style={styles.imageView} onPress={() => setModal(true)}>
            <CustomSvg SvgComponent={<Camera width={30} height={30} />} />
          </Pressable>
        </View>
        <Text style={styles.nameTxt}>{userData?.name}</Text>
        <Space height={30} />
        <View style={styles.rowPhone}>
          <CustomSvg SvgComponent={<Phone />} />
          <Text style={styles.phoneTxt}>+91 {userData?.phone}</Text>
        </View>
        <View style={styles.rowPhone}>
          <CustomSvg SvgComponent={<Inbox />} />
          <Text style={styles.phoneTxt}>{userData?.email}</Text>
        </View>
        {userData?.isGmailVerified === 1 && (
          <View style={styles.verifyContainer}>
            <Text style={styles.verify}>Please verify your email address</Text>
            <Button
              title="Verify Now"
              containerStyle={styles.buttonContainer}
              textStyle={styles.textStyle}
              elevation={true}
            />
          </View>
        )}
        <View style={styles.line} />
        <ItemRow
          Icon={Kyc}
          title={'KYC Details'}
          content="You can view/update your KYC details"
          onPress={goItemDetail}
        />
        <View style={styles.line} />
        <ItemRow
          Icon={Policy}
          title={'Privacy Policy'}
          onPress={goItemDetail}
        />
        <View style={styles.line} />
        <ItemRow
          Icon={Logout}
          title={'Log out'}
          onPress={logout}
          nextReq={false}
          textColor={{color: ORANGE_DARK}}
        />
        <Loader loading={loading} />
        <PhotoSelectionModal
          showModal={modal}
          closeModal={() => setModal(false)}
          onPressTakePhoto={onPressTakePhoto}
          onPressChooseFromGallery={onPressChooseFromGallery}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
