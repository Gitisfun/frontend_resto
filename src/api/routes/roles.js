import httpClient from '../httpClient';

const END_POINT = '/roles';


const getAllRoles = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getRole = (id) => httpClient.get(`${END_POINT}/${id}`);

const createRole = (role) => httpClient.post(END_POINT, role);

const updateRole = (id, role) => httpClient.put(`${END_POINT}/${id}`, role);

const deleteRole = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
}