import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import navbar from './components/Navbar/navbar';
import authData from './helpers/data/authData';
import airports from './components/Airports/airport';
import crew from './components/crew/crew';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  navbar.attachDropdownEvents();
  navbar.attachEvents();
  airports.buildAirports();
  crew.createCrewCard();
};
init();
