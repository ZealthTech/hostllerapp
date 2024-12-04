import {Image, Modal, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {Camera, CrossIcon, Gallery, PlusSingle} from '../../../assets';
import InputText from '../../../components/inputText/InputText';
import Space from '../../../components/space/Space';
import StarView from '../StarView';
import ImagePicker from 'react-native-image-crop-picker';
import {PURPLE} from '../../../utils/colors/colors';
import {requestCameraPermission} from '../../../utils/constants/commonFunctions';
import Button from '../../../components/button/Button';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {addReviewRequest} from '../../../redux/reducers/addReviewReducer';

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
  } = props || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [review, setReview] = useState('');
  const [reviewError, setReviewError] = useState(false);
  const dispatch = useDispatch();
  const {loading, status} = useSelector(state => state.addReviewReducer);

  const selectFromGallery = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        console.log('Permission denied ');

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
          console.log('image ', image);
          setSelectedImages([...selectedImages, image]); // Add selected images to state
        }
      }, 1000);
    } catch (error) {
      if (error?.message?.includes('User cancelled')) {
        console.log('You have cancelled the image selection');
      } else {
        console.log('error ', error);
      }
    }
  };

  const takePhoto = async () => {
    try {
      const ifPermission = await requestCameraPermission();
      if (!ifPermission) {
        console.log('Permission denied ');
        return;
      }
      console.log('99 ');
      //set timeout to resolve automatically closed camera
      setTimeout(async () => {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        console.log('Images selected ----', image);
        if (image) {
          setSelectedImages([...selectedImages, image]); // Add selected images to state
        }
      }, 1000);
    } catch (error) {
      if (error?.message?.includes('User cancelled')) {
        console.log('You have cancelled the image selection');
      } else {
        console.log('error ', error);
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
      const user_id = 'USRW7HOXB';
      const formData = new FormData();
      if (selectedImages?.length > 0) {
        selectedImages.forEach((image, index) => {
          formData.append('ratingImages', {
            uri: image?.path,
            type: image?.mime || 'image/jpeg', // Ensure MIME type is valid
            name: `ratingImage_${index}.jpg`, // Ensure unique names
          });
        });
      }

      // Add other fields
      formData.append('userId', 'USRW7HOXB');
      formData.append('pgId', '67319c0ff6fd2696708c3750');
      formData.append('rating', selectedRating);
      formData.append('review', review);
      formData.append('location', locationRate);
      formData.append('food', foodRate);
      formData.append('staffBehaviour', staffRate);
      formData.append('clean', cleanRate);
      formData.append('amenities', amenitiesRate);

      dispatch(addReviewRequest(formData));
    }
  };
  useEffect(() => {
    if (status) {
      setReview('');
      setSelectedImages([]);
      //reviewSheetRef?.current?.close(); // Close the bottom sheet
    }
  }, [status, reviewSheetRef]);
  console.log('selected images ', selectedImages);
  console.log('stars ', amenitiesRate);
  console.log('status ', status);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.photos}>Write Your Review</Text>
        <CustomSvg
          SvgComponent={<CrossIcon fill="black" />}
          isClickable={true}
          onPress={() => reviewSheetRef?.current?.close()}
        />
      </View>
      <ScrollView style={styles.writeView} showsVerticalScrollIndicator={false}>
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
          handleStarPress={ind =>
            handleStarPress(ind, setSelectedRating, selectedRating)
          }
          selectedRating={selectedRating}
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
          handleStarPress={ind => handleStarPress(ind, setCleanRate, cleanRate)}
          selectedRating={cleanRate}
        />
        <StarView
          reviewFor="StaffBehaviour"
          handleStarPress={ind => handleStarPress(ind, setStaffRate, staffRate)}
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
        <View style={styles.selectedImagesContainer}>
          <Pressable
            style={styles.photosView}
            onPress={() => setShowModal(true)}>
            <CustomSvg
              SvgComponent={<PlusSingle fill={PURPLE} height={15} width={15} />}
            />
          </Pressable>

          {selectedImages.map((image, index) => (
            <View key={index} style={styles.selectedImg}>
              <Pressable
                onPress={() => {
                  const updatedImages = selectedImages.filter(
                    (_, i) => i !== index,
                  );
                  setSelectedImages(updatedImages);
                }}
                style={styles.crossIcon}>
                <CustomSvg
                  SvgComponent={<CrossIcon fill="red" height={10} width={12} />}
                />
              </Pressable>
              <Image
                source={{uri: image.path}} // Assuming 'image.path' is the path of the selected image
                style={styles.selectedImage}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.select}>Select Photo</Text>
            <View style={styles.line} />
            <Pressable style={styles.row} onPress={onPressTakePhoto}>
              <CustomSvg SvgComponent={<Camera height={20} width={20} />} />
              <Text style={styles.take}>Take a Photo</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable style={styles.row} onPress={onPressChooseFromGallery}>
              <CustomSvg SvgComponent={<Gallery height={20} width={20} />} />
              <Text style={styles.take}>Choose from Gallery</Text>
            </Pressable>
            <Button
              title="Cancel"
              containerStyle={styles.button}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
      <Button
        title="Submit"
        containerStyle={styles.bottomBtn}
        onPress={submitReview}
        loading={loading}
      />
    </View>
  );
};

export default WriteReviewView;
