
import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getAuthToken, getDecodedToken } from './user';
let serverUrl = `${url}/KidGoals`;

export const createKidGoal = async (obj) => {
    return await axios.post(`${serverUrl}/`, obj);
};


export const wishListKidGoal = async (obj) => {
    return await axios.post(`${serverUrl}/createWishlistForKid`, obj);
};

/////////kid id
export const getAllByKidId = async (id) => {
    return await axios.get(`${serverUrl}/getAllByKidId/${id}`);
};


///////get by kid id and goal id
export const getBykidIdandGoalId = async (id, kidId) => {
    return await axios.get(`${serverUrl}/getBykidIdandGoalId/${id}/${kidId}`);
};



///////Update kid goal status by kid id and goal id
export const updateKIdGoalStatusBykidIdandGoalId = async (id, kidId, obj) => {
    return await axios.patch(`${serverUrl}/updateKIdGoalStatusBykidIdandGoalId/${id}/${kidId}`, obj);
};



///////delete kid goal status by kid id and goal id
export const deleteKIdGoalStatusBykidIdandGoalId = async (id, kidId) => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.delete(`${serverUrl}/deleteKIdGoalFromCartBykidIdandGoalId/${id}/${kidId}`, config);
};



///////delete kid goal status by kid id and goal id
export const checkoutOrder = async (obj) => {
    let token = await getAuthToken()
    console.log(token)
    let config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    return await axios.post(`${serverUrl}/checkout/`, obj, config);
};