import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/coupon`;

export const getActiveCoupons = async () => {

    return await axios.get(`${serverUrl}/getActiveCoupons`);
};
