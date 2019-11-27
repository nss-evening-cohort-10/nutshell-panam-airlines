import axios from 'axios';
import apiKeys from '../apiKeys.json';
import 'firebase/auth';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const menusDataByFlightId = (flightId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menus.json?orderBy="flightId"&equalTo="${flightId}"`)
    .then((response) => {
      const demMenus = response.data;
      const menus = [];
      Object.keys(demMenus).forEach((ftId) => {
        demMenus[ftId].id = ftId;
        menus.push(demMenus[ftId]);
      });
      resolve(menus);
    })
    .catch((error) => reject(error));
});

export default { menusDataByFlightId };
