import httpClient from '../httpClient';

const END_POINT = '/contact';


const getAllContact = () => httpClient.get(`${END_POINT}`);

const getContact = (id) => httpClient.get(`${END_POINT}/${id}`);

const createContact = (contact) => httpClient.post(END_POINT, contact);

const updateContact = (id, contact) => httpClient.put(`${END_POINT}/${id}`, contact);

const deleteContact = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}