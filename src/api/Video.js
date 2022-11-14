import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/userVideo`;


export const getTodayMission = async () => {
    return await axios.get(`${serverUrl}/`)
}
