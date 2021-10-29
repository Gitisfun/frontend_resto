import httpClient from '../httpClient';

const END_POINT = '/menu-items';


const getAllMenuItems = (id) => httpClient.get(`${END_POINT}/${id}`);

const createMenuItems = (list) => httpClient.post(END_POINT, list);

const deleteMenuItem = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllMenuItems,
    createMenuItems,
    deleteMenuItem
}