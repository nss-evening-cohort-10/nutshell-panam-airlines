import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
// import Navbar from './components/Navbar/navbar';
import authData from './helpers/data/authData';
import airport from './components/Airports/airport';
import crew from './components/crew/crew';
import 'bootstrap';
import '../styles/main.scss';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  // Navbar.attachEvents();
  airport.createAirportCard();
  airport.displayAirports();
  crew.createCrewCard();
  crew.displayCrew();
  crew.hideCrew();
};

init();
