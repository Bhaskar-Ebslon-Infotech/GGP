import axios from 'axios';
import { url } from './url';
import { getAuthToken } from './user';
let serverUrl = `${url}/address`;

export const addAddress = async (obj) => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.post(`${serverUrl}/`, obj, config);
};


export const getaddress = async () => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.get(`${serverUrl}/getaddress/`, config);
};
export const updateaddress = async (id, obj) => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.patch(`${serverUrl}/updateaddress/${id}`, obj, config);
};
export const getAddressById = async (id) => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.get(`${serverUrl}/getAddressById/${id}`, config);
};
export const deleteaddress = async id => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.delete(`${serverUrl}/deleteaddress/${id}`, config);
};
