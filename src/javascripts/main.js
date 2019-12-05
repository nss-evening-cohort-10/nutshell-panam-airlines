import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import navbar from './components/Navbar/navbar';
import authData from './helpers/data/authData';
import airports from './components/Airports/airport';
import flights from './components/Flights/flights';
import crewMembers from './components/crewMembers/crewMembers';
// import crews from './components/crews/crews';

import 'bootstrap';
import '../styles/main.scss';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  flights.printFlights();
  authData.checkLoginStatus();
  navbar.attachDropdownEvents();
  navbar.attachEvents();
  airports.buildAirports();
  crewMembers.createCrewMemberCard();
};
init();
