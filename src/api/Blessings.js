import axios from 'axios';
import { url } from './url';
import { getDecodedToken } from './user';
let serverUrl = `${url}/Blessings`;

export const getBlessingsByKidId = async (id) => {

    return await axios.get(`${serverUrl}/getByKidId/${id}`);
};
