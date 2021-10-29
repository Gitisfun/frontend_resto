import httpClient from '../httpClient';

const END_POINT = '/permissions';


const getAllPermissions = (search) => httpClient.get(`${END_POINT}?search=${search}`);

export {
    getAllPermissions
}