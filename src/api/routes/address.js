import httpClient from '../httpClient';

const END_POINT = '/address';


const getAllAddress = () => httpClient.get(`${END_POINT}`);

const getAddress = (id) => httpClient.get(`${END_POINT}/${id}`);

const updateAddress = (id, address) => httpClient.put(`${END_POINT}/${id}`, address);

const deleteAddress = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllAddress,
    getAddress,
    updateAddress,
    deleteAddress
}