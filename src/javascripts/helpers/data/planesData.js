import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlanesByPlaneId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/planes.json`)
    .then((response) => {
      console.log(response);
      const daPlanes = response.data;
      const planes = [];
      Object.keys(daPlanes).forEach((fbId) => {
        daPlanes[fbId].id = fbId;
        planes.push(daPlanes[fbId]);
      });
      resolve(planes);
    })
    .catch((error) => reject(error));
});

export default { getPlanesByPlaneId };
