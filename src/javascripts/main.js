import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import 'bootstrap';
import planesData from './helpers/data/planesData';
import planes from './components/Planes/planes';
import '../styles/main.scss';
import airport from './components/Airports/airport';
import crew from './components/crew/crew';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
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
