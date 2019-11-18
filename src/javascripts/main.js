import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import airport from './components/Airports/airport';

import 'bootstrap';
import '../styles/main.scss';

import crew from './components/crew/crew';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  airport.createAirportCard();
  airport.displayAirports();
  airport.hideAirports();
  crew.createCrewCard();
  crew.displayCrew();
  crew.hideCrew();
};

init();
