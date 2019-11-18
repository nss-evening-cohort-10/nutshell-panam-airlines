import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFoodByID = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/foods.json?orderBy="id"&equalTo="${id}"`)
    .then((response) => {
      const demFoods = response.data;
      const foods = [];
      Object.keys(demFoods).forEach((fdId) => {
        demFoods[fdId].id = fdId;
        foods.push(demFoods[fdId]);
      });
      resolve(foods);// Hard code to return foods
    })
    .catch((error) => reject(error));
});

export default { getFoodByID };
