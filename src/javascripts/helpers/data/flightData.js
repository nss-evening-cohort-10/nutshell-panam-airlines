import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
const getAllFlights = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/flights.json`)
    .then((response) => {
      const flights = response.data;
      console.log(flights);
      const flightsWithIds = [];
      Object.keys(flights).forEach((fbId) => {
        flights[fbId].id = fbId;
        flightsWithIds.push(flights[fbId]);
      });
      resolve(flightsWithIds);
    })
    .catch((err) => reject(err));
});

export default { getAllFlights };
