import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/userWallet`;

export const getUserWallet = async () => {
  let token = await getDecodedToken();
  // console.log('token:  >>>>>', token);
  return await axios.get(`${serverUrl}/getByUserId/${token.userId}`);
};


export const getKidWallet = async (id) => {

  // console.log('token:  >>>>>', token);
  return await axios.get(`${serverUrl}/getByUserId/${id}`);
};
export const AddMoneytoUserWallet = async (obj) => {
  let token = await getDecodedToken();
  return await axios.post(`${serverUrl}/addMoney/${token.userId}`, obj);
};
export const markRejectedPayment = async (obj) => {
  let token = await getDecodedToken();
  return await axios.post(`${serverUrl}/markRejectedPayment/${token.userId}`, obj);
};

export const CreateTransaction = async (obj) => {
  let token = await getDecodedToken();
  return await axios.post(`${serverUrl}/CreateTransaction/${token.userId}`, obj);
};
export const reduceMoneyFromUserWallet = async (obj) => {
  let token = await getDecodedToken();
  return await axios.delete(`${serverUrl}/deleteById/${token.userId}`, obj);
};



export const addMoneyTokidWallet = async (id, obj) => {
  return await axios.patch(`${serverUrl}/sendMoneyFromParentToChild/${id}`, obj);
};
