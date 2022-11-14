import axios from "axios";
import { url } from "./url";
import EncryptedStorage from 'react-native-encrypted-storage';
let serverUrl = `${url}/userSubscription`


export const getUserSubscription = async (id) => {
    return await axios.get(`${serverUrl}/getByUserId/${id}`)
}

export const UserSubscriptionCreate = async (obj) => {
    return await axios.post(`${serverUrl}/`, obj)
}
export const updatePaymentSuccess = async (id) => {
    return await axios.patch(`${serverUrl}/updatePaymentSuccess/${id}`)
}




export const updatePaymentfail = async (id) => {
    return await axios.patch(`${serverUrl}/updatePaymentFail/${id}`)
}

