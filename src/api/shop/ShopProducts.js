import { axiosApiInstance } from '../../../App';
import { url } from '../url';
let serverUrl = `${url}/products`;


export const getShopProducts = async () => {
    return await axiosApiInstance.get(`${serverUrl}/getAllProducts`);
};

export const getShopSaleProducts = async () => {
    return await axiosApiInstance.get(`${serverUrl}/getAllSaleProducts`);
};


export const getShopProductsForKid = async () => {
    return await axiosApiInstance.get(`${serverUrl}/getAllProductsForKId`);
};


export const getShopProductsbyCategory = async (id) => {
    return await axiosApiInstance.get(`${serverUrl}/getShopProductsbyCategory/${id}`);
};


export const getShopProductsbyProductId = async (id, itemId) => {
    return await axiosApiInstance.get(`${serverUrl}/getShopProductsbyProductId/${id}/${itemId}`);
};

