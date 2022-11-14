import axios from 'axios';
import { url } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDecodedToken } from './user';
let serverUrl = `${url}/userMissions`;

export const createMissions = async (obj) => {
    return await axios.post(`${serverUrl}/`, obj);
};
export const getUserMissions = async (kidId) => {
    // let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getByUserId/${kidId}`);
};
export const getMissionsForApprovalByKidId = async (kidId) => {
    // let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getMissionsForApprovalByKidId/${kidId}`);
};

export const getMissionsCompletedByKidId = async (kidId) => {
    // let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getMissionsCompletedByKidId/${kidId}`);
};


export const getMissionsInProgressByKidId = async (kidId) => {
    // let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getMissionsInProgressByKidId/${kidId}`);
};
export const deleteMission = async (id) => {
    console.log(id)
    return await axios.delete(`${serverUrl}/deleteById/${id}`);
};



/////////////////
export const getAllDailyMission = async () => {
    let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getAllMissionsForKid/${decoded.userId}`)
}



export const getMissionBonus = async () => {
    let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getAllMissionBonusForKid/${decoded.userId}`)
}

export const getMissionStreak = async () => {
    let decoded = await getDecodedToken();
    return await axios.get(`${serverUrl}/getMissionStreakForKid/${decoded.userId}`)
}

export const getTodayMission = async () => {
    return await axios.get(`${serverUrl}/`)
}

export const getTodaysCompletedMissionByKid = async () => {
    let decoded = await getDecodedToken();

    return await axios.get(`${serverUrl}/getTodaysCompletedMissionByKid/${decoded.userId}`)
}
export const addMoneyToKidsWalletForMissionsCompleted = async (arr) => {
    let decoded = await getDecodedToken();

    return await axios.patch(`${serverUrl}/addMoneyToKidsWalletForMissionsCompleted/`, arr)
}
