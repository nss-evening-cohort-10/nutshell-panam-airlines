import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlanes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/planes.json`)
    .then((response) => {
      // console.log(response);
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

const getPlaneById = (planeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/planes/${planeId}.json`)
    .then((response) => {
      console.log(response.data);
      resolve(response.data);
    })
    .catch((error) => reject(error));
});


const deletePlane = (planeId) => axios.delete(`${baseUrl}/planes/${planeId}.json`);

const addNewPlane = (newPlane) => axios.post(`${baseUrl}/planes.json`, newPlane);

const updatePlane = (planeId, updatedPlane) => axios.put(`${baseUrl}/planes/${planeId}.json`, updatedPlane);

export default {
  getPlanes,
  deletePlane,
  addNewPlane,
  updatePlane,
  getPlaneById,
};
