import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import {useFormik} from 'formik';
import {kycDetailSchema} from './helper';
import Button from '../../components/button/Button';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Upload} from '../../assets';
import {apiGet, apiPost} from '../../network/axiosInstance';
import {
  GET_KYC_DETAILS,
  UPDATE_KYC_DETAILS,
} from '../../utils/constants/apiEndPoints';
import PhotoSelectionModal from '../../components/photoSelectionModal/PhotoSelectionModal';
import ImagePicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  showToast,
} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST} from '../../utils/constants/constants';
import SelectedImagesFrame from '../../components/selectedImagesFrame/SelectedImagesFrame';
import {GRAY_LIGHT_CB, ORANGE_DARK} from '../../utils/colors/colors';
import Loader from '../../components/loader/Loader';

const KycDetails = navigation => {
  const {route} = navigation || {};
  const {userData} = route?.params || {};
  const [aadharImages, setAadharImages] = useState([]);
  const [otherIDs, setOtherIDs] = useState([]);
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [isAdhar, setIsAdhar] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('user data ', userData);
  useEffect(() => {
    getKycDetails();
  }, [getKycDetails]);

  const getKycDetails = useCallback(async () => {
    const response = await apiGet(GET_KYC_DETAILS, {}, userData?.token);

    if (response?.status) {
      const fetchedData = response?.data;
      setData(fetchedData);
      const transformedAadharImages = fetchedData?.aadhaarCard?.map(image => ({
        path: image,
      }));
      setAadharImages(transformedAadharImages);
      const transformedIDsImages = fetchedData?.idCard?.map(image => ({
        path: image,
      }));
      setOtherIDs(transformedIDsImages);
    }
    setLoading(false);
  }, [userData]);

  const submitKycDetails = async values => {
    //one of the ID is required Aadhar or other government ID
    if (aadharImages?.length > 0 || otherIDs?.length > 0) {
      const formData = new FormData();
      if (aadharImages?.length > 0) {
        aadharImages.forEach((image, index) => {
          formData.append('aadhaarImage', {
            uri: image?.path,
            type: image?.mime || 'image/jpeg', // Ensure MIME type is valid
            name: `aadhaarImage${index}.jpg`, // Ensure unique names
          });
        });
      } else {
        formData.append('aadhaarImage', []);
      }
      if (otherIDs?.length > 0) {
        otherIDs.forEach((image, index) => {
          formData.append('idImage', {
            uri: image?.path,
            type: image?.mime || 'image/jpeg', // Ensure MIME type is valid
            name: `idImage${index}.jpg`, // Ensure unique names
          });
        });
      } else {
        formData.append('idImage', []);
      }
      formData.append('userId', userData?.userId);
      formData.append('fatherName', values.fatherName);
      formData.append('address', values?.address);
      formData.append('occupation', values?.occupation);
      formData.append('department', values?.department);
      formData.append('familyNumber', values?.familyPhone);
      const sendKycDetails = await apiPost(
        UPDATE_KYC_DETAILS,
        formData,
        userData?.token,
      );
      if (sendKycDetails?.status) {
        navigation?.navigation?.goBack();
      }
    } else {
      showToast(ERROR_TOAST, 'Please submit Aadhar or Government ID');
    }
  };
  const {handleChange, handleSubmit, errors, touched, values} = useFormik({
    validationSchema: kycDetailSchema,
    initialValues: {
      fatherName: data?.fatherName || '',
      address: data?.address || '',
      occupation: data?.occupation || '',
      department: data?.department || '',
      familyPhone: data?.familyNumber || '',
    },
    enableReinitialize: true, // Allows the form to reinitialize when `initialValues` change
    onSubmit: inputValues => {
      submitKycDetails(inputValues);
    },
  });

  const selectFromGallery = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        showToast(ERROR_TOAST, 'Permissions not allowed');

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
          if (isAdhar) {
            setAadharImages([...aadharImages, image]);
            setIsAdhar(false);
          } else {
            setOtherIDs([...otherIDs, image]);
          }
        }
      }, 1000);
    } catch (error) {
      if (error?.message?.includes('User cancelled')) {
        showToast(ERROR_TOAST, 'Image selection cancelled');
      } else {
        showToast(ERROR_TOAST, error);
      }
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
          if (isAdhar) {
            setAadharImages([...aadharImages, image]);
            setIsAdhar(false);
          } else {
            setOtherIDs([...otherIDs, image]);
          }
        }
      }, 1000);
    } catch (error) {
      showToast(ERROR_TOAST, error);
    }
  };

  const openSheet = _isAdhar => {
    setIsAdhar(_isAdhar);
    setModal(true);
  };
  const onPressTakePhoto = () => {
    takePhoto();
    setModal(false);
  };

  const onPressChooseFromGallery = () => {
    selectFromGallery();
    setModal(false);
  };
  const isAdharInputDisable = aadharImages?.length === 2;
  const isOtherIDsDisable = otherIDs?.length === 2;
  return (
    <View style={styles.container}>
      <BackIconHeader title="KYC Verification" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <InputText
          label="Father Name"
          labelReq={true}
          onChangeText={handleChange('fatherName')}
          value={values.fatherName}
          isErrorMsgRequired={touched.fatherName && !!errors.fatherName}
          error={errors.fatherName}
        />
        <InputText
          label="Address"
          labelReq={true}
          onChangeText={handleChange('address')}
          value={values.address}
          isErrorMsgRequired={touched.address && !!errors.address}
          error={errors.address}
        />
        <InputText
          label="Occupation"
          labelReq={true}
          onChangeText={handleChange('occupation')}
          value={values.occupation}
          isErrorMsgRequired={touched.occupation && !!errors.occupation}
          error={errors.occupation}
        />
        <InputText
          label="Department"
          labelReq={true}
          onChangeText={handleChange('department')}
          value={values.department}
          isErrorMsgRequired={touched.department && !!errors.department}
          error={errors.department}
        />
        <InputText
          label="Family Phone Number"
          labelReq={true}
          onChangeText={handleChange('familyPhone')}
          value={values.familyPhone}
          isErrorMsgRequired={touched.familyPhone && !!errors.familyPhone}
          error={errors.familyPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />
        <Text style={styles.label}>Aadhar ID Card</Text>
        <Pressable
          style={styles.idContainer}
          onPress={() => openSheet(true)}
          disabled={isAdharInputDisable}>
          <CustomSvg
            SvgComponent={
              <Upload
                fill={isAdharInputDisable ? GRAY_LIGHT_CB : ORANGE_DARK}
              />
            }
            imgStyle={styles.image}
          />
        </Pressable>
        <SelectedImagesFrame
          selectedImages={aadharImages}
          setSelectedImages={setAadharImages}
          showModalPress={() => setModal(true)}
          imageContainer={styles.frameContainer}
          imageStyle={styles.images}
        />
        <Text style={styles.or}>Or</Text>
        <Text style={[styles.label, {marginTop: 0}]}>Any Government ID</Text>
        <Pressable
          style={[styles.idContainer]}
          onPress={() => openSheet(false)}
          disabled={isOtherIDsDisable}>
          <CustomSvg
            SvgComponent={
              <Upload fill={isOtherIDsDisable ? GRAY_LIGHT_CB : ORANGE_DARK} />
            }
            imgStyle={styles.image}
          />
        </Pressable>
        <SelectedImagesFrame
          selectedImages={otherIDs}
          setSelectedImages={setOtherIDs}
          showModalPress={() => setModal(true)}
          imageContainer={styles.frameContainer}
          imageStyle={styles.images}
        />
        <Button
          title="Submit"
          containerStyle={styles.button}
          textStyle={styles.textStyle}
          onPress={handleSubmit}
        />
      </ScrollView>
      <PhotoSelectionModal
        showModal={modal}
        closeModal={() => setModal(false)}
        onPressTakePhoto={onPressTakePhoto}
        onPressChooseFromGallery={onPressChooseFromGallery}
      />
      <Loader loading={loading} />
    </View>
  );
};

export default KycDetails;
