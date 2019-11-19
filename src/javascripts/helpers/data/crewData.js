import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllCrewMembers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew.json`)
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

const removeCrewMember = (id) => axios.delete(`${baseUrl}/crew/${id}.json`);

export default { getAllCrewMembers, removeCrewMember };
