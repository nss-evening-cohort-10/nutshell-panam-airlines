import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllAirports = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/airports.json`)
    .then((response) => {
      const demAirports = response.data;
      const airports = [];
      Object.keys(demAirports).forEach((fbId) => {
        demAirports[fbId].id = fbId;
        airports.push(demAirports[fbId]);
      });
      resolve(airports);
    })
    .catch((error) => reject(error));
});

const getAirportById = (airportId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/airports/${airportId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updateAirport = (airportId, updatedAirport) => axios.put(`${baseUrl}airports/${airportId}.json`, updatedAirport);

const removeAirport = (airportId) => axios.delete(`${baseUrl}/airports/${airportId}.json`);

const addNewAirport = (newAirport) => axios.post(`${baseUrl}/airports.json`, newAirport);

export default {
  getAllAirports,
  removeAirport,
  addNewAirport,
  updateAirport,
  getAirportById,
};
