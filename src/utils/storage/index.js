import AsyncStorage from '@react-native-async-storage/async-storage';
export const setDataToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const getDataFromStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
