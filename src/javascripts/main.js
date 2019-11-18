import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
};

init();
