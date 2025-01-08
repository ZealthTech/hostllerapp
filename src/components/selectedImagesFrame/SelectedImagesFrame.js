import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {CrossIcon, PlusSingle} from '../../assets';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {
  GRAY_LIGHT,
  PURPLE,
  PURPLE_EXTRA_LIGHT,
} from '../../utils/colors/colors';

const SelectedImagesFrame = props => {
  const {
    selectedImages = [],
    setSelectedImages,
    showModalPress,
    showSelectionFrame = false,
    imageContainer,
    imageStyle,
  } = props || {};

  return (
    <View style={[styles.container, imageContainer]}>
      {showSelectionFrame && (
        <Pressable style={styles.photosView} onPress={showModalPress}>
          <CustomSvg
            SvgComponent={<PlusSingle fill={PURPLE} height={15} width={15} />}
          />
        </Pressable>
      )}

      {selectedImages?.map((image, index) => (
        <View key={index} style={styles.selectedImg}>
          <Pressable
            onPress={() => {
              const updatedImages = selectedImages?.filter(
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
            style={[styles.selectedImage, imageStyle]}
          />
        </View>
      ))}
    </View>
  );
};

export default SelectedImagesFrame;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  photosView: {
    width: getDeviceWidth() * 0.26,
    height: getDeviceHeight() * 0.13,
    justifyContent: 'center',
    borderColor: PURPLE,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: PURPLE_EXTRA_LIGHT,
    borderWidth: 1,
    marginRight: 10,
  },
  selectedImage: {
    width: getDeviceWidth() * 0.26,
    height: getDeviceHeight() * 0.13,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedImg: {
    borderRadius: 10,
    marginRight: 14,
    marginBottom: 14,
  },
  crossIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 20,
    padding: 6,
  },
});
