import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {Camera, Gallery} from '../../assets';
import Button from '../button/Button';
import {
  BLACK_COLOR,
  GRAY_LIGHT_CB,
  PURPLE,
  TEXT_COLOR,
  WHITE,
} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_SEMIBOLD} from '../../utils/styles/commonStyles';

const PhotoSelectionModal = props => {
  const {
    showModal = false,
    onPressTakePhoto,
    closeModal,
    onPressChooseFromGallery,
  } = props || {};
  return (
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
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PhotoSelectionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: WHITE,
    borderRadius: 10,
  },
  line: {backgroundColor: GRAY_LIGHT_CB, height: 1, width: '100%'},
  row: {flexDirection: 'row', gap: 6, padding: 16, alignItems: 'center'},
  take: {
    color: BLACK_COLOR,
    fontSize: fontsSize.fs16,
    fontFamily: MONTSERRAT_SEMIBOLD,
  },
  select: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: TEXT_COLOR,
    fontSize: fontsSize.fs14,
    padding: 16,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: PURPLE,
  },
});
