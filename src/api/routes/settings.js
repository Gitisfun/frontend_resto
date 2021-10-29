import httpClient from '../httpClient';

const END_POINT = '/settings';


const getSetting = (id) => httpClient.get(`${END_POINT}/${id}`);

const updateSetting = (id, setting) => httpClient.put(`${END_POINT}/${id}`, setting);


export {
    getSetting,
    updateSetting,
}