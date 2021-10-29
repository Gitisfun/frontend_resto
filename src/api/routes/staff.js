import httpClient from '../httpClient';

const END_POINT = '/staff';


const getAllStaff = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getStaff = (id) => httpClient.get(`${END_POINT}/${id}`);

const createStaff = (staff) => httpClient.post(END_POINT, staff);

const updateStaff = (id, staff) => httpClient.put(`${END_POINT}/${id}`, staff);

const updatePassword = (id, staff) => httpClient.put(`${END_POINT}/password/${id}`, staff);

const deleteStaff = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllStaff,
    getStaff,
    createStaff,
    updateStaff,
    updatePassword,
    deleteStaff
}