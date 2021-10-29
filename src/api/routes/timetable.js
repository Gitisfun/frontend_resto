import httpClient from '../httpClient';

const END_POINT = '/timetable';


const getTimetable = (id) => httpClient.get(`${END_POINT}/${id}`);

const createTimetable = (timetable) => httpClient.post(END_POINT, timetable);

const updateTimetable = (id, timetable) => httpClient.put(`${END_POINT}/${id}`, timetable);

const deleteTimetable = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable
}