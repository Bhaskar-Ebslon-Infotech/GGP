import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/playlist`;



export const getAllPlaylistsByKidId = async (id) => {
    return await axios.get(`${serverUrl}/getByKidId/${id}`);
};

