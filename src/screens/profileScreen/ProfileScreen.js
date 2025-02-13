import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {apiGet, apiPost, postDataWithImages} from '../../network/axiosInstance';
import {
  LOGOUT_URL,
  PROFILE_DETAIL,
  UPDATE_PROFILE_IMAGE,
} from '../../utils/constants/apiEndPoints';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {
  Camera,
  Inbox,
  Kyc,
  Logout,
  Phone,
  Policy,
  TermAndConditions,
} from '../../assets';
import Space from '../../components/space/Space';
import {ORANGE_DARK} from '../../utils/colors/colors';
import ItemRow from './ItemRow';
import Loader from '../../components/loader/Loader';
import PhotoSelectionModal from '../../components/photoSelectionModal/PhotoSelectionModal';
import {
  requestCameraPermission,
  showToast,
} from '../../utils/constants/commonFunctions';
import {
  ERROR_TOAST,
  REGISTER_DATA,
  SUCCESS_TOAST,
} from '../../utils/constants/constants';
import ImagePicker from 'react-native-image-crop-picker';
import {
  HOME_NAVIGATOR,
  KYC_DETAILS_SCREEN,
  LOGIN,
  PRIVACY_POLICY,
} from '../../navigation/routes';
import Button from '../../components/button/Button';
import {useIsFocused} from '@react-navigation/native';
import {version} from '../../../package.json';
import {removeItemFromStorage, setDataToStorage} from '../../utils/storage';
import {clearUserInfo} from '../../redux/reducers/userInfoReducer';
import CustomBottomSheet from '../../components/customBottomSheet/CustomBottomSheet';

const ProfileScreen = navigation => {
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const confirmationRef = useRef();
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    getProfileDetail();
  }, [getProfileDetail, userInfo, focus]);

  const getProfileDetail = useCallback(async () => {
    const response = await apiGet(PROFILE_DETAIL, {}, userInfo?.token);
    if (response?.status) {
      setUserData(response?.data);
    }
    setLoading(false);
  }, [userInfo]);

  const goItemDetail = () => {
    navigation?.navigation?.navigate(KYC_DETAILS_SCREEN, {userData: userInfo});
  };

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
  const goToPrivacyPolicy = (slug, title) => {
    navigation?.navigation?.navigate(PRIVACY_POLICY, {
      slug: slug,
      userData: userInfo,
      title: title,
    });
  };
  const gotToLoginScreen = () => {
    navigation?.navigation?.navigate(LOGIN, {
      userData: userInfo,
      targetRoute: HOME_NAVIGATOR,
    });
  };

  const renderLoginView = () => {
    return (
      <View style={styles.emptyProfileView}>
        <Image
          source={require('../../assets/images/user_profile.png')}
          style={styles.profileImg}
        />
        <Text style={styles.myProfile}>My Profile</Text>
        <Text style={styles.content}>
          Discover and explore a wide range of PGs and hostels with us.{'\n'}{' '}
          Sign up or log in now to get started!
        </Text>
        <Button title="Log in or sign up" onPress={gotToLoginScreen} />
      </View>
    );
  };
  const showProfileData = !loading && userInfo?.token;

  const logout = () => {
    confirmationRef?.current?.expand();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    const response = await apiPost(
      LOGOUT_URL,
      {userId: userInfo.userId},
      userInfo?.token,
    );
    if (response?.status) {
      dispatch(clearUserInfo());
      // Pass a callback to execute after AsyncStorage is cleared
      removeItemFromStorage(REGISTER_DATA, () => {
        showToast(SUCCESS_TOAST, response?.message);
        navigation.navigation.replace(HOME_NAVIGATOR);
      });
    }
    setLogoutLoading(false);
    closeSheet();
  };
  const closeSheet = () => {
    confirmationRef?.current?.close();
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title="Profile" />
      {!showProfileData && renderLoginView()}
      {showProfileData && (
        <ScrollView
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}>
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
              <Text style={styles.verify}>
                Please verify your email address
              </Text>
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
            onPress={() => goToPrivacyPolicy('privacypolicy', 'Privacy Policy')}
          />
          <View style={styles.line} />
          <ItemRow
            Icon={TermAndConditions}
            title={'Terms & Conditions'}
            onPress={() =>
              goToPrivacyPolicy('termsandconditions', 'Terms & Conditions')
            }
          />
          <View style={styles.line} />
          <ItemRow
            Icon={Logout}
            title={'Log out'}
            onPress={logout}
            nextReq={false}
            textColor={{color: ORANGE_DARK}}
          />
          <Text style={styles.version}>Version {version}</Text>
          <PhotoSelectionModal
            showModal={modal}
            closeModal={() => setModal(false)}
            onPressTakePhoto={onPressTakePhoto}
            onPressChooseFromGallery={onPressChooseFromGallery}
          />
        </ScrollView>
      )}
      <CustomBottomSheet ref={confirmationRef} snapPoints={['20%']}>
        <View style={styles.sheetView}>
          <Text style={styles.sure_text}>
            Are You sure you want to logout from your account?
          </Text>
          <View style={styles.buttonView}>
            <Button
              title="Cancel"
              containerStyle={styles.cancelBtn}
              textStyle={styles.btn_text_cancel}
              onPress={closeSheet}
            />
            <Button
              title="Logout"
              onPress={handleLogout}
              loading={logoutLoading}
            />
          </View>
        </View>
      </CustomBottomSheet>
      <Loader loading={loading} />
    </View>
  );
};

export default ProfileScreen;
