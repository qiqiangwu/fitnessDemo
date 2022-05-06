import AsyncStorage from '@react-native-async-storage/async-storage';
import _, {Function} from 'lodash';

// 阻止多次触发点击事件
export function oneClick(onPress: () => void, wait = 2000) {
  return _.debounce(onPress, wait, {
    leading: true,
    trailing: false,
  });
}

export const set = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`set storage error`, e);
  }
};

export const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(`get storage error`, e);
  }
};
