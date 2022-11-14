import axios from 'axios';
import {url} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getDecodedToken} from './user';
let serverUrl = `${url}/category`;



export const getAllCategoriesByKidId = async id => {
  return await axios.get(`${serverUrl}/getByKidId/${id}`);
};

