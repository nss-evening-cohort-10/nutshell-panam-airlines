import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import airportsData from './helpers/data/airportsData';
import airport from './components/Airports/airport';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  airportsData.getAllAirports();
  airport.createAirportCard();
  airport.displayAirports();
};

init();
