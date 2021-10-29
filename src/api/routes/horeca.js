import httpClient from '../httpClient';

const END_POINT = '/horeca';


const getAllHoreca = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getHoreca = (id) => httpClient.get(`${END_POINT}/${id}`);

const createHoreca = (horeca) => httpClient.post(END_POINT, horeca);

const updateHoreca = (id, horeca) => httpClient.put(`${END_POINT}/${id}`, horeca);

const deleteHoreca = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllHoreca,
    getHoreca,
    createHoreca,
    updateHoreca,
    deleteHoreca
}