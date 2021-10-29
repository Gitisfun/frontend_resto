import httpClient from '../httpClient';

const END_POINT = '/tables';


const getAllTables = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getAllTablesByHorecaId = (horeca_id) => httpClient.get(`${END_POINT}/all/${horeca_id}`);

const getTables = (id) => httpClient.get(`${END_POINT}/${id}`);

const createTables = (table) => httpClient.post(END_POINT, table);

const updateTables = (id, table) => httpClient.put(`${END_POINT}/${id}`, table);

const updateStatusTables = (id, table) =>{ return httpClient.put(`${END_POINT}/status/${id}`, table)};
    
const deleteTables   = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllTables,
    getAllTablesByHorecaId,
    getTables,
    createTables,
    updateTables,
    updateStatusTables,
    deleteTables
}