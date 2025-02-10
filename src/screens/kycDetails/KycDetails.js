import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import {useFormik} from 'formik';
import {
  bloodGroups,
  departmentList,
  formatDate,
  kycDetailSchema,
  occupationList,
} from './helper';
import Button from '../../components/button/Button';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {RightTick, Upload} from '../../assets';
import {apiGet, postDataWithImages} from '../../network/axiosInstance';
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
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import SelectedImagesFrame from '../../components/selectedImagesFrame/SelectedImagesFrame';
import {GRAY_LIGHT_CB, ORANGE_DARK, PURPLE} from '../../utils/colors/colors';
import Loader from '../../components/loader/Loader';
import DropDownForSmallData from '../../components/dropDownForSmallData/DropDownForSmallData';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TermsAndConditionTxt from '../../components/termsAndConditionTxt/TermsAndConditionTxt';
import {PRIVACY_POLICY} from '../../navigation/routes';

const KycDetails = navigation => {
  const {route} = navigation || {};
  const {userData} = route?.params || {};
  const [aadharImages, setAadharImages] = useState([]);
  const [otherIDs, setOtherIDs] = useState([]);
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [isAdhar, setIsAdhar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [professionDropDown, setProfessionDropDown] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showBloodGroups, setShowBloodGroups] = useState(false);
  const [agreeTAndC, setAgreeTAndC] = useState(false);

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

  useEffect(() => {
    setSelectedDate(data?.dob);
  }, [data]);

  const submitKycDetails = async values => {
    if (!agreeTAndC) {
      showToast(ERROR_TOAST, 'Please Agree Terms and Conditions');
      return;
    }
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
      formData.append('dob', selectedDate);
      formData.append('bloodGroup', values?.bloodGroup);
      const sendKycDetails = await postDataWithImages(
        UPDATE_KYC_DETAILS,
        formData,
        userData?.token,
      );
      if (sendKycDetails?.status) {
        showToast(SUCCESS_TOAST, sendKycDetails?.message);
        navigation?.navigation?.goBack();
      }
    } else {
      showToast(ERROR_TOAST, 'Please upload any ID');
    }
  };
  const {handleChange, handleSubmit, errors, touched, values, setFieldValue} =
    useFormik({
      validationSchema: kycDetailSchema,
      initialValues: {
        fatherName: data?.fatherName || '',
        address: data?.address || '',
        occupation: data?.occupation || '',
        department: data?.department || '',
        familyPhone: data?.familyNumber || '',
        bloodGroup: data?.bloodGroup || '',
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
  const handlePressIcon = (setDropDown, visible) => {
    setDropDown(!visible);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = date => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    hideDatePicker();
  };
  const getDepartment = () => {
    if (values.occupation === 'Others') {
      return (
        <InputText
          label="Department"
          labelReq={true}
          onChangeText={handleChange('department')}
          value={values.department}
          isErrorMsgRequired={touched.department && !!errors.department}
          error={errors.department}
          inputContainer={styles.containerStyle}
        />
      );
    } else {
      return (
        <DropDownForSmallData
          label="Choose Department"
          labelText="Select Department"
          data={departmentList}
          onPressIcon={() =>
            handlePressIcon(setProfessionDropDown, professionDropDown)
          }
          dropDownVisible={professionDropDown}
          selectedValue={values.department}
          selectOccupation={selectedItem => {
            setFieldValue('department', selectedItem);
          }}
        />
      );
    }
  };

  const agreeTermsAndCondition = () => {
    setAgreeTAndC(!agreeTAndC);
  };

  const goToPrivacyScreen = () => {
    navigation?.navigation?.navigate(PRIVACY_POLICY, {
      slug: 'termsandconditions',
      userData: userData,
      title: 'Terms & Conditions',
    });
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title="KYC Verification" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <InputText
          label="Father Name"
          labelReq={true}
          onChangeText={text => {
            const stringText = text.replace(/[^a-zA-Z\s]/g, '');
            handleChange('fatherName')(stringText);
          }}
          value={values.fatherName}
          isErrorMsgRequired={touched.fatherName && !!errors.fatherName}
          inputContainer={styles.containerStyle}
          error={errors.fatherName}
        />
        <InputText
          label="Permanent Full Address"
          labelReq={true}
          onChangeText={handleChange('address')}
          value={values.address}
          isErrorMsgRequired={touched.address && !!errors.address}
          error={errors.address}
          inputContainer={styles.containerStyle}
        />
        <DropDownForSmallData
          label="Choose Occupation"
          labelText="Select Profession"
          data={occupationList}
          onPressIcon={() =>
            handlePressIcon(setDropDownVisible, dropDownVisible)
          }
          dropDownVisible={dropDownVisible}
          selectedValue={values.occupation}
          selectOccupation={selectedItem => {
            setFieldValue('occupation', selectedItem); // Update Formik state
          }}
        />
        {values.occupation !== 'Student' && getDepartment()}
        <InputText
          label="Emergency Contact Number"
          labelReq={true}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            handleChange('familyPhone')(numericText);
          }}
          value={values.familyPhone}
          isErrorMsgRequired={touched.familyPhone && !!errors.familyPhone}
          error={errors.familyPhone}
          inputContainer={styles.containerStyle}
          keyboardType="phone-pad"
          maxLength={10}
        />
        <View style={styles.dobView}>
          <View style={styles.dobLeftView}>
            <Text style={[styles.label, {marginStart: 0}]}>Date Of Birth</Text>
            <Pressable
              style={[styles.idContainer, styles.dobInput]}
              onPress={showDatePicker}>
              <Text style={styles.dob}>
                {selectedDate || 'Select Date of Birth'}
              </Text>
            </Pressable>
          </View>
          <View style={styles.dobRightView}>
            <DropDownForSmallData
              label="Blood Group"
              labelText="Blood Group"
              labelStyle={styles.lavelStyle}
              data={bloodGroups}
              dropdownButtonStyle={styles.dropDownButton}
              onPressIcon={() =>
                handlePressIcon(setShowBloodGroups, showBloodGroups)
              }
              dropDownVisible={showBloodGroups}
              selectedValue={values.bloodGroup}
              selectOccupation={selectedItem => {
                setFieldValue('bloodGroup', selectedItem);
              }}
              dropDownStyle={styles.dropDownStyle}
            />
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          buttonTextColorIOS={PURPLE}
          maximumDate={new Date()}
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
        <TermsAndConditionTxt
          agreeTermsAndCondition={agreeTermsAndCondition}
          agreeTAndC={agreeTAndC}
          onPressTAndC={goToPrivacyScreen}
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
