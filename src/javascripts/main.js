import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import navbar from './components/Navbar/navbar';
import authData from './helpers/data/authData';
import airport from './components/Airports/airport';
import crew from './components/crew/crew';

import 'bootstrap';
import planes from './components/Planes/planes';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  navbar.attachDropdownEvents();
  navbar.attachEvents();
  airport.createAirportCard();
  crew.createCrewCard();
  planes.buildPlanes();
  planes.displayPlanes();
};
init();
