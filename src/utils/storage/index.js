import AsyncStorage from '@react-native-async-storage/async-storage';
export const setDataToStorage = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, value);
    if (callback) {
      callback();
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getDataFromStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    return null;
  }
};

export const removeItemFromStorage = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key);
    callback?.();
    return true;
  } catch (e) {
    return false;
  }
};
