// 
import { axiosApiInstance } from '../../../App';
import { url } from '../url';
let serverUrl = `${url}/shopCategory`;



export const getShopCategories = async () => {
    // let token = await getAuthToken()
    // console.log(token)
    // let config = {
    //     headers: {
    //         authorization: `Bearer ${token}`
    //     }
    // }
    return await axiosApiInstance.get(`${serverUrl}/`);
};

