import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/notification`;



export const getAllNotificationsByUserId = async (kidId) => {
    return await axios.get(`${serverUrl}/getByUserId/${kidId}`);
};

