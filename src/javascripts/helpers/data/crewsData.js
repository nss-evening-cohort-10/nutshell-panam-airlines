import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllCrews = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crews.json`)
    .then((response) => {
      const demCrews = response.data;
      const crews = [];
      Object.keys(demCrews).forEach((fbId) => {
        demCrews[fbId].id = fbId;
        crews.push(demCrews[fbId]);
      });
      resolve(crews);
    })
    .catch((error) => reject(error));
});