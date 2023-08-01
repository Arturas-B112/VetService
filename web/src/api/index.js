import axios from 'axios';

const baseURL = 'http://localhost:8080/';

export const getPets = () => axios.get(`${baseURL}v1/pets`);

export const addPet = (body) => axios.post(`${baseURL}v1/pets`, body);

export const getLogs = (id) => axios.get(`${baseURL}v1/logs/${id}`);

export const createLogs = (body) => axios.post(`${baseURL}v1/logs`, body);
