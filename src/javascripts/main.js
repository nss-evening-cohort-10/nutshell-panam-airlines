import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import 'bootstrap';
import '../styles/main.scss';
import planesData from './helpers/data/planesData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  planesData.getPlanesByPlaneId();
};
init();
