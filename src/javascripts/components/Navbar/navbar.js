import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import login from '../Auth/auth';

const logoutButton = $('#navbar-button-logout');
const loginButton = $('##google-auth');

const attachEvents = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
      }).catch((err) => console.error('you still logged in', err));
  });
  loginButton.click((e) => {
    e.preventDefault();
      .then(() => {
        login.signMeIn();
      }).catch((err) => console.error('you logged out', err));
  });
};

export default { attachEvents };
