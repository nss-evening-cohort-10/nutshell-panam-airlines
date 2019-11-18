import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';

import 'bootstrap';
import '../styles/main.scss';

import crew from './components/crew/crew';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  crew.createCrewCard();
  crew.displayCrew();
  crew.hideCrew();
};

init();
