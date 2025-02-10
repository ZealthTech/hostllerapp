import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {CrossIcon} from '../../../assets';
import InputText from '../../../components/inputText/InputText';
import Space from '../../../components/space/Space';
import StarView from '../StarView';
import ImagePicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  showToast,
} from '../../../utils/constants/commonFunctions';
import Button from '../../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {addReviewRequest} from '../../../redux/reducers/addReviewReducer';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../../utils/constants/constants';
import {DEFAULT_ERROR_STRING} from '../../../utils/constants/apiCodes';
import PhotoSelectionModal from '../../../components/photoSelectionModal/PhotoSelectionModal';
import SelectedImagesFrame from '../../../components/selectedImagesFrame/SelectedImagesFrame';

const WriteReviewView = props => {
  const {
    reviewSheetRef,
    handleStarPress,
    selectedRating,
    locationRate,
    foodRate,
    cleanRate,
    staffRate,
    amenitiesRate,
    setSelectedRating,
    setFoodRate,
    setCleanRate,
    setStaffRate,
    setAmenitiesRate,
    setLocationRate,
    pgId,
  } = props || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [review, setReview] = useState('');
  const [reviewError, setReviewError] = useState(false);
  const [isReviewSubmit, setIsReviewSubmit] = useState(false);
  const [ratingErrorText, setRatingErrorText] = useState('');
  const {userInfo} = useSelector(state => state.userInfoReducer);

  const dispatch = useDispatch();
  const {loading, status, message, error} = useSelector(
    state => state.addReviewReducer,
  );

  useEffect(() => {
    if (status && !loading && isReviewSubmit) {
      showToast(SUCCESS_TOAST, message);
      setReview('');
      clearAllRatings();
      setSelectedImages([]);
      reviewSheetRef?.current?.close();
      setIsReviewSubmit(false);
    } else if (!status && !loading && error) {
      showToast(ERROR_TOAST, DEFAULT_ERROR_STRING);
    }
  }, [
    status,
    reviewSheetRef,
    message,
    dispatch,
    loading,
    error,
    isReviewSubmit,
    clearAllRatings,
  ]);

  const clearAllRatings = useCallback(() => {
    setIsReviewSubmit(false);
    setSelectedRating(0);
    setLocationRate(0);
    setFoodRate(0);
    setCleanRate(0);
    setStaffRate(0);
    setAmenitiesRate(0);
  }, [
    setIsReviewSubmit,
    setLocationRate,
    setFoodRate,
    setCleanRate,
    setStaffRate,
    setAmenitiesRate,
    setSelectedRating,
  ]);

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
          setSelectedImages([...selectedImages, image]); // Add selected images to state
        }
      }, 1000);
    } catch (_error) {
      if (_error?.message?.includes('User cancelled')) {
        showToast(ERROR_TOAST, 'Image selection cancelled');
      } else {
        showToast(ERROR_TOAST, _error);
      }
    }
  };

  const takePhoto = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        return;
      }
      setTimeout(async () => {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        if (image) {
          setSelectedImages([...selectedImages, image]); // Add selected images to state
        }
      }, 1000);
    } catch (_error) {
      if (_error?.message?.includes('User cancelled')) {
        showToast(ERROR_TOAST, 'Image selection cancelled');
      } else {
        showToast(ERROR_TOAST, _error);
      }
    }
  };

  const onPressTakePhoto = () => {
    takePhoto();
    setShowModal(false);
  };

  const onPressChooseFromGallery = () => {
    selectFromGallery();
    setShowModal(false);
  };

  const submitReview = () => {
    let isValid = true;
    if (selectedRating < 1) {
      isValid = false;
      setRatingErrorText('This field is required');
    } else {
      setRatingErrorText('');
    }
    if (review.trim() === '') {
      setReviewError('Review is required');
      isValid = false;
    } else if (review.trim().length < 3) {
      setReviewError('Review should not less than 3 characters');
      isValid = false;
    } else {
      setReviewError('');
    }
    if (isValid) {
      setIsReviewSubmit(true);
      const formData = new FormData();
      if (selectedImages?.length > 0) {
        selectedImages.forEach((image, index) => {
          formData.append('ratingImages', {
            uri: image?.path,
            type: image?.mime || 'image/jpeg', // Ensure MIME type is valid
            name: `ratingImage_${index}.jpg`, // Ensure unique names
          });
        });
      } else {
        formData.append('ratingImages', []);
      }

      // Add other fields
      formData.append('userId', userInfo?.userId);
      formData.append('pgId', pgId);
      formData.append('rating', selectedRating);
      formData.append('review', review);
      formData.append('location', locationRate);
      formData.append('food', foodRate);
      formData.append('staffBehaviour', staffRate);
      formData.append('clean', cleanRate);
      formData.append('amenities', amenitiesRate);
      dispatch(addReviewRequest({formData: formData, token: userInfo?.token}));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.photos}>Write Your Review</Text>
        <CustomSvg
          SvgComponent={<CrossIcon fill="black" />}
          isClickable={true}
          onPress={() => reviewSheetRef?.current?.close()}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.writeView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        showsVerticalScrollIndicator={false}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.yourReview}>Your Review</Text>
          <InputText
            inputContainer={styles.reviewContainer}
            value={review}
            onChange={text => setReview(text)}
            placeholder="Write your review"
            keyboardType={'ascii-capable'}
            multiline={true}
            onChangeText={txt => {
              setReview(txt);
              if (txt.trim() !== '') {
                setReviewError('');
              }
            }}
            isErrorMsgRequired={reviewError?.length > 0}
            error={reviewError}
          />
          <Space height={20} />
          <StarView
            reviewFor="Ratings"
            handleStarPress={ind => {
              setRatingErrorText('');
              handleStarPress(ind, setSelectedRating, selectedRating);
            }}
            selectedRating={selectedRating}
            ratingErrorText={ratingErrorText}
            errorReq={true}
          />
          <StarView
            reviewFor="Location"
            handleStarPress={ind =>
              handleStarPress(ind, setLocationRate, locationRate)
            }
            selectedRating={locationRate}
          />
          <StarView
            reviewFor="Food"
            handleStarPress={ind => handleStarPress(ind, setFoodRate, foodRate)}
            selectedRating={foodRate}
          />
          <StarView
            reviewFor="Cleanliness"
            handleStarPress={ind =>
              handleStarPress(ind, setCleanRate, cleanRate)
            }
            selectedRating={cleanRate}
          />
          <StarView
            reviewFor="StaffBehaviour"
            handleStarPress={ind =>
              handleStarPress(ind, setStaffRate, staffRate)
            }
            selectedRating={staffRate}
          />
          <StarView
            reviewFor="Amenities"
            handleStarPress={ind =>
              handleStarPress(ind, setAmenitiesRate, amenitiesRate)
            }
            selectedRating={amenitiesRate}
          />
          <Space height={16} />
          <Text style={styles.yourReview}>Add Photos</Text>
          {/* Render selected images */}
          <SelectedImagesFrame
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            showModalPress={() => setShowModal(true)}
            showSelectionFrame={true}
          />
          {/* </View> */}
          <Button
            title="Submit"
            containerStyle={styles.bottomBtn}
            onPress={() => {
              submitReview();
            }}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <PhotoSelectionModal
        showModal={showModal}
        onPressTakePhoto={onPressTakePhoto}
        closeModal={() => setShowModal(false)}
        onPressChooseFromGallery={onPressChooseFromGallery}
      />
    </View>
  );
};

export default WriteReviewView;
