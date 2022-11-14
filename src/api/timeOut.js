import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/timeOut`;


export const setTimeOut = async (obj) => {
       return await axios.post(`${serverUrl}/`,obj);
};

export const getTimeOut = async () => {
    let decoded = await getDecodedToken()
    return await axios.get(`${serverUrl}/getByKidId/${decoded.userId}`);
};

