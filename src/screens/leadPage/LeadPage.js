import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import LeadBanners from './leadBanner/LeadBanner';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import {bedrooms, data, validationSchemaLead} from './helper';
import DropDownInput from '../../components/dropDownInput/DropDownInput';
import {MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import Button from '../../components/button/Button';
import ImageCard from './leadBanner/ImageCard';
import {useFormik} from 'formik';
import {apiPost} from '../../network/axiosInstance';
import {
  CITY_LIST,
  STATES_LIST,
  SUBMIT_LEAD_FORM_DATA,
} from '../../utils/constants/apiEndPoints';
import {useSelector} from 'react-redux';
import {showToast} from '../../utils/constants/commonFunctions';
import {SUCCESS_TOAST} from '../../utils/constants/constants';

const LeadPage = () => {
  const [bedroom, setBedroom] = useState('');
  const [cityList, setCityList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState('');

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    if (stateId !== '') {
      fetchCities();
    }
  }, [stateId, fetchCities]);

  const fetchCities = useCallback(async () => {
    const response = await apiPost(CITY_LIST, {state_id: 5});
    if (response?.status) {
      setCityList(response?.data);
    }
  }, []);

  const fetchStates = useCallback(async () => {
    const response = await apiPost(STATES_LIST);
    if (response?.status) {
      setStates(response?.data);
    }
  }, []);
  const initialValues = {
    ownerName: '',
    totalBeds: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    state: '',
  };
  const submitFormData = async values => {
    const response = await apiPost(
      SUBMIT_LEAD_FORM_DATA,
      values,
      userInfo?.token,
    );
    if (response?.status) {
      showToast(SUCCESS_TOAST, response?.message);
      resetForm(); // Reset form to initial values
      setBedroom('');
    }
  };
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchemaLead,
    initialValues: initialValues,
    onSubmit: inputValues => {
      submitFormData(inputValues);
    },
  });
  const handleCitySelect = city => {
    setFieldValue('city', city?.name);
    setCityModal(false);
  };
  const handleBedroomSelect = _bedroom => {
    setFieldValue('totalBeds', _bedroom);
    setBedroom(_bedroom);
  };
  const handleStateSelect = state => {
    setFieldValue('state', state?.state_title);
    setStateId(state?.state_id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <LeadBanners />
        <View style={styles.formView}>
          <Text style={styles.labelText}>Name of the house owner</Text>
          <InputText
            inputContainer={styles.inputField}
            placeholder="Name of the house owner"
            onChangeText={handleChange('ownerName')}
            value={values.ownerName}
            isErrorMsgRequired={touched.ownerName && !!errors.ownerName}
            error={errors.ownerName}
            maxLength={20}
          />
          <Text style={styles.labelText}>Name of bedrooms in the property</Text>
          <View style={styles.bedroomView}>
            {bedrooms.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.bedroom(item?.title === bedroom)}
                activeOpacity={0.6}
                onPress={() => handleBedroomSelect(item?.title)}>
                <Text style={styles.bedCount(item?.title === bedroom)}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {touched.totalBeds && !!errors.totalBeds && (
            <Text style={styles.error}>{errors.totalBeds}</Text>
          )}
          <Text style={styles.labelText}>Select State</Text>
          <DropDownInput
            data={states}
            isErrorMsgRequired={touched.state && !!errors.state}
            error={errors.state}
            value={values.state}
            modalVisible={modalVisible}
            handleCitySelect={handleStateSelect}
            setModalVisible={() => setModalVisible(false)}
            onPressIcon={() => setModalVisible(true)}
            placeholder="Select a State"
            state={true}
            disabled={false}
          />
          <Text style={styles.labelText}>Select located city</Text>
          <DropDownInput
            data={cityList}
            isErrorMsgRequired={touched.city && !!errors.city}
            error={errors.city}
            value={values.city}
            modalVisible={cityModal}
            handleCitySelect={handleCitySelect}
            setModalVisible={() => setCityModal(false)}
            onPressIcon={() => setCityModal(true)}
            placeholder="Select a City"
            disabled={values.state === ''}
          />
          <Text style={styles.labelText}>Where is your property located</Text>
          <InputText
            inputContainer={styles.inputField}
            placeholder="Property Location"
            onChangeText={handleChange('address')}
            value={values.address}
            isErrorMsgRequired={touched.address && !!errors.address}
            error={errors.address}
            maxLength={30}
          />
          <Text style={styles.labelText}>
            Enter your phone no.{' '}
            <Text style={{fontFamily: MONTSERRAT_REGULAR}}>
              (should be available for calls & whatsapp)
            </Text>
          </Text>
          <InputText
            inputContainer={styles.inputField}
            placeholder="Enter Phone Number"
            onChangeText={handleChange('phone')}
            value={values.phone}
            isErrorMsgRequired={touched.phone && !!errors.phone}
            error={errors.phone}
            maxLength={10}
          />
          <Text style={styles.labelText}>Email ID</Text>
          <InputText
            inputContainer={styles.inputField}
            placeholder="Enter Email ID"
            onChangeText={handleChange('email')}
            value={values.email}
            isErrorMsgRequired={touched.email && !!errors.email}
            error={errors.email}
          />
          <Button
            title="Continue"
            elevation={true}
            containerStyle={styles.button}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.choose}>
            {'Why 25k+ owners choose \nHostellers'}
          </Text>
          {data?.map(item => (
            <ImageCard
              key={item?.id}
              Icon={item?.icon}
              title={item?.title}
              content={item?.content}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LeadPage;
