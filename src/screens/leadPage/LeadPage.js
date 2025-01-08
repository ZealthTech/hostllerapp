import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import Header from '../../components/header/Header';
import LeadBanner from './leadBanner/LeadBanner';
import LeadBanners from './leadBanner/LeadBanner';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import {bedrooms, data, validationSchemaLead} from './helper';
import DropDownInput from '../../components/dropDownInput/DropDownInput';
import {MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import Button from '../../components/button/Button';
import CustomSvg from '../../components/customSvg/CustomSvg';
import ImageCard from './leadBanner/ImageCard';
import {CommentIcon} from '../../assets';
import {useFormik} from 'formik';
import {apiPost} from '../../network/axiosInstance';
import {
  CITY_LIST_BIHAR,
  SUBMIT_LEAD_FORM_DATA,
} from '../../utils/constants/apiEndPoints';
import {useSelector} from 'react-redux';
import {showToast} from '../../utils/constants/commonFunctions';
import {SUCCESS_TOAST} from '../../utils/constants/constants';

const LeadPage = () => {
  const [bedroom, setBedrooms] = useState('');
  const [cityList, setCityList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const {userInfo} = useSelector(state => state.userInfoReducer);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const fetchCities = useCallback(async () => {
    const response = await apiPost(CITY_LIST_BIHAR, {state_id: 5});
    if (response?.status) {
      setCityList(response?.data);
    }
  }, []);
  const initialValues = {
    ownerName: '',
    totalBeds: '',
    city: '',
    address: '',
    phone: '',
    email: '',
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
      setBedrooms('');
      setSelectedCity('');
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
    setSelectedCity(city);
    setFieldValue('city', city);
    setModalVisible(false);
  };
  const handleBedroomSelect = _bedroom => {
    setFieldValue('totalBeds', _bedroom);
    setBedrooms(_bedroom);
  };
  console.log(values?.bedrooms);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          />
          <Text style={styles.labelText}>Name of bedrooms in the property</Text>
          <View style={styles.bedroomView}>
            {bedrooms.map(item => (
              <TouchableOpacity
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
          <Text style={styles.labelText}>Select located city</Text>
          <DropDownInput
            data={cityList}
            isErrorMsgRequired={touched.city && !!errors.city}
            error={errors.city}
            value={values.city}
            onPressIcon={() => setModalVisible(true)}
          />
          <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={cityList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.cityItem}
                      onPress={() => handleCitySelect(item?.name)}>
                      <Text style={styles.cityName}>{item?.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                />
              </View>
            </View>
          </Modal>
          <Text style={styles.labelText}>Where is your property located</Text>
          <InputText
            inputContainer={styles.inputField}
            placeholder="Property Location"
            onChangeText={handleChange('address')}
            value={values.address}
            isErrorMsgRequired={touched.address && !!errors.address}
            error={errors.address}
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
