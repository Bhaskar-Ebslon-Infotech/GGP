import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/playlistvideos`;



export const getAllPlaylistVideosByKidAndPlaylistId = async (id, playlistId) => {
    return await axios.get(`${serverUrl}/getByIdAndKidId/${id}/${playlistId}`);
};

