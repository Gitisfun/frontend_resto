import httpClient from '../httpClient';

const END_POINT = '/btw';


const getAllBtw = () => httpClient.get(`${END_POINT}`);


export {
    getAllBtw,
}