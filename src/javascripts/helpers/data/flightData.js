import axios from 'axios';
import apiKeys from  '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const getAllFlights = () => new Promise((resolve,reject) => {
  axios.get(`${baseUrl}/shows.json`)
  .then((response) => {
    const flights = response.data;
    const flightsWithIds = [];
    Object.keys(flights).forEach((fbId) => {
      flights[fbId].id = fbId;
    });
    resolve(flightsWithIds);
  })
  ,catch((err) => reject(err));
});

export default { getAllFlights };
