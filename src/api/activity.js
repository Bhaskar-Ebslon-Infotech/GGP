import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/activity`;

export const getActivitiesByCategoryId = async (id, kidId) => {

  return await axios.get(`${serverUrl}/getByCategoryId/${id}/${kidId}`);
};
