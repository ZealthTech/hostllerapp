import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomSvg from '../customSvg/CustomSvg';
import {DownArrow} from '../../assets';
import {COLOR_GRAY_7F} from '../../utils/colors/colors';
import InputText from '../inputText/InputText';
import Button from '../button/Button';

const DropDownInput = props => {
  const {
    data,
    onPressIcon,
    isErrorMsgRequired,
    error,
    value = '',
    handleCitySelect,
    setModalVisible,
    modalVisible,
  } = props || {};
  const isValue = value !== '';
  return (
    <>
      <Pressable style={styles.container} onPress={onPressIcon}>
        <Text style={styles.city(isValue)}>
          {!isValue ? 'Enter City' : value}
        </Text>
        <CustomSvg SvgComponent={<DownArrow />} />
      </Pressable>
      {isErrorMsgRequired && <Text style={styles.error}>{error}</Text>}
      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={setModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
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
      )}
    </>
  );
};

export default DropDownInput;
