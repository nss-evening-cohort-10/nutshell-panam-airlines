import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getFood = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/food.json`)
    .then((response) => {
      const demFoods = response.data;
      const foods = [];
      Object.keys(demFoods).forEach((fdId) => {
        demFoods[fdId].id = fdId;
        foods.push(demFoods[fdId]);
      });
      resolve(foods);
    })
    .catch((error) => reject(error));
});

const getFoodByID = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/food/${id}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const addNewFood = (newFood) => axios.post(`${baseUrl}/food.json`, newFood);

const deleteFood = (foodId) => axios.delete(`${baseUrl}/food/${foodId}.json`);

const editFood = (id, updatedFood) => axios.put(`${baseUrl}/food/${id}.json`, updatedFood);

export default {
  getFood,
  getFoodByID,
  addNewFood,
  deleteFood,
  editFood,
};
