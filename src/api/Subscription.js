import axios from "axios";
import { url } from "./url";
import EncryptedStorage from 'react-native-encrypted-storage';
let serverUrl = `${url}/subscription`


export const getSubscription = async () => {
    return await axios.get(`${serverUrl}/`)
}



