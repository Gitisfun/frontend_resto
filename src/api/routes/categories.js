import httpClient from '../httpClient';

const END_POINT = '/categories';


const getAllCategories = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getCategories = (id) => httpClient.get(`${END_POINT}/${id}`);

const createCategories = (category) => httpClient.post(END_POINT, category);

const updateCategories = (id, category) => httpClient.put(`${END_POINT}/${id}`, category);

const deleteCategories = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllCategories,
    getCategories,
    createCategories,
    updateCategories,
    deleteCategories
}