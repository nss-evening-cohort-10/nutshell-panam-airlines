import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import Navbar from './components/Navbar/navbar';

import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  Navbar.logoutEvent();
};

init();
