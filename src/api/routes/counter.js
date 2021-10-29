import httpClient from '../httpClient';

const END_POINT = '/counter';


const getCounter = (id) => httpClient.get(`${END_POINT}/${id}`);

const createCounter = (counter) => httpClient.post(END_POINT, counter);

const updateCounter = (id, counter) => httpClient.put(`${END_POINT}/${id}`, counter);


export {
    getCounter,
    createCounter,
    updateCounter,
}