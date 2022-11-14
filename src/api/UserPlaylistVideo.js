import axios from 'axios';
import { url } from './url';
import { getDecodedToken } from './user';
let serverUrl = `${url}/UserPlaylistVideo`;

export const GetAllPlaylistVideoForKid = async () => {
    let decoded = await getDecodedToken()
    return await axios.get(`${serverUrl}/getAllVideosForKid/${decoded.userId}`);
};

export const getVideoByid = async id => {
    return await axios.get(`${serverUrl}/getVideoByid/${id}`);
};
export const updateVideoByid = async (id, obj) => {
    return await axios.post(`${serverUrl}/getVideoByid/${id}`, obj);
};
export const getAllVideoByKidIdForApproval = async (id) => {
    return await axios.get(`${serverUrl}/getAllVideoByKidIdForApproval/${id}`);
};

export const getAllVideoByKidIdForTodo = async (id) => {
    return await axios.get(`${serverUrl}/getAllVideoByKidIdForTodo/${id}`);
};


export const getAllCompletedVideoByKidId = async (id) => {
    console.log(id, `${serverUrl}/getAllCompletedVideoByKidId/${id}`)
    return await axios.get(`${serverUrl}/getAllCompletedVideoByKidId/${id}`);
};


export const getAllCompletedVideoByKidIdForReport = async (id) => {
    console.log(id, `${serverUrl}/getAllCompletedVideoByKidIdForReport/${id}`)
    return await axios.get(`${serverUrl}/getAllCompletedVideoByKidIdForReport/${id}`);
};
export const getAllInProgressVideoByKidId = async (id) => {
    // console.log(id, `${serverUrl}/getAllInProgressVideoByKidId/${id}`)
    return await axios.get(`${serverUrl}/getAllInProgressVideoByKidId/${id}`);
};



export const handlegetAllCompletedVideoByKidIdForToday = async () => {
    let decoded = await getDecodedToken()

    return await axios.get(`${serverUrl}/getAllCompletedVideoByKidIdForToday/${decoded.userId}`);
};


export const addMoneyToKidsWalletForVideosCompleted = async (obj) => {
    let decoded = await getDecodedToken()

    return await axios.patch(`${serverUrl}/addMoneyToKidWalletForVideoCompletion/${decoded.userId}`, obj);
};

