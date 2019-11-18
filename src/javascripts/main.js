import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import Navbar from './components/Navbar/navbar';
import authData from './helpers/data/authData';
import airport from './components/Airports/airport';
import 'bootstrap';
import planesData from './helpers/data/planesData';
import planes from './components/Planes/planes';
import '../styles/main.scss';
import crew from './components/crew/crew';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  Navbar.attachEvents();
  airport.createAirportCard();
  airport.displayAirports();
  crew.createCrewCard();
  crew.displayCrew();
  crew.hideCrew();
  planesData.getPlanesByPlaneId();
  planes.buildPlanes();
  planes.displayPlanes();
};
init();
