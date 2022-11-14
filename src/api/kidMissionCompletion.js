import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
import { axiosApiInstance } from '../../App';
let serverUrl = `${url}/kidMissionCompletion`;

export const kidMissionCreate = async (obj) => {
    return await axiosApiInstance.post(`${serverUrl}/`, obj);
};
export const kidMissionGetById = async (id) => {
    return await axiosApiInstance.get(`${serverUrl}/getById/${id}`);
};

export const getAllKidMission = async () => {
    let decoded = await getDecodedToken();
    return await axiosApiInstance.get(`${serverUrl}/getByKidId//${decoded.userId}`)
}

export const KidMissionUpdate = async (id, obj) => {
    return await axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, obj)
}
