import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/users`;

export const loginKid = async (id, obj) => {
    return await axios.post(`${serverUrl}/loginKid/${id}`, obj);
};

