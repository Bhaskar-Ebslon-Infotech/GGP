import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/UserPlaylist`;



export const getAllUserPlaylistByKidId = async (id) => {
    return await axios.get(`${serverUrl}/getAllPlaylistByKidId/${id}`);
};


export const newUserPlaylist = async (obj) => {
    return await axios.post(`${serverUrl}/newUserPlaylist`, obj);
};


export const getVideoByPlaylistId = async (id) => {
    return await axios.get(`${serverUrl}/getVideoByPlaylistId/${id}`);
};

export const addVideosInPlaylist = async (obj) => {
    return await axios.post(`${serverUrl}/addVideosInPlaylist`, obj);
};

export const deleteVideoInPlaylist = async (id) => {
    return await axios.delete(`${serverUrl}/deleteUserPlayListVideo/${id}`);
};
export const deleteUserPlayList = async (id) => {
    return await axios.delete(`${serverUrl}/deleteUserPlayList/${id}`);
};


export const addVideoInFromAdminPlaylist = async (obj) => {
    return await axios.post(`${serverUrl}/addVideoInFromAdminPlaylist`, obj);
};


export const getAllVideoByKidId = async (id) => {
    return await axios.get(`${serverUrl}/getAllVideoByKidId/${id}`);
};

