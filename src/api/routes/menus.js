import httpClient from '../httpClient';

const END_POINT = '/menus';


const getAllMenus = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getMenu = (id) => httpClient.get(`${END_POINT}/${id}`);

const getCurrentlyActive = (horeca_id) => httpClient.get(`${END_POINT}/currently-active/${horeca_id}`);

const activate = (id, menu) => httpClient.put(`${END_POINT}/activate/${id}`, menu);

const deactivate = (id, menu) => httpClient.put(`${END_POINT}/deactivate/${id}`, menu);

const createMenu = (menu) => httpClient.post(END_POINT, menu);

const updateMenu = (id, menu) => httpClient.put(`${END_POINT}/${id}`, menu);

const updateCurrentlyActive = (id, menu) => httpClient.put(`${END_POINT}/currently-active/${id}`, menu);

const deleteMenu = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllMenus,
    getMenu,
    getCurrentlyActive,
    activate,
    deactivate,
    createMenu,
    updateMenu,
    updateCurrentlyActive,
    deleteMenu
}