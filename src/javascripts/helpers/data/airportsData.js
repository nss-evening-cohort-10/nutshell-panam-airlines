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

const removeAirport = (airportId) => axios.delete(`${baseUrl}/airports/${airportId}.json`);

export default { getAllAirports, removeAirport };
