import AsyncStorage from "@react-native-async-storage/async-storage";

const localStorageKeyconst = {
  fcmToken: "fcmToken",
  authToken: "authToken",
};
const AppInstalledDate = "APP_INSTALLED_DATE";

export const updateAppInstalledDate = async (isForce = false) => {
  if (isForce) {
    await storeData(AppInstalledDate, `${moment().unix()}`);
  } else {
    const date = await getData(AppInstalledDate);
    if (!date) {
      await storeData(AppInstalledDate, `${moment().unix()}`);
    }
  }
};

export const getAppInstalledDate = async () => {
  const date = getData(AppInstalledDate);
  if (!date) {
    return moment().unix();
  }
  return date;
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }

  return null;
};

export const PutAuthToken = (token) => {
  storeData(localStorageKeyconst?.authToken, token);
};
export const GetAuthToken = () => {
  return getData(localStorageKeyconst?.authToken);
};

