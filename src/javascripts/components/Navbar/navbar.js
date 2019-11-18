import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import airport from '../Airports/airport';
import crew from '../crew/crew';
import food from '../foodService/foodService';
import auth from '../Auth/auth';

const displayHome = () => {
  $('#home-link').on('click', () => {
    $('#home').show();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#plane').hide();
  });
};

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const attachEvents = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
      }).catch((err) => console.error('you still logged in', err));
  });
  loginButton.click((e) => {
    e.preventDefault();
    auth.signMeIn();
  });
};

const attachDropdownEvents = () => {
  displayHome();
  airport.displayAirports();
  crew.displayCrew();
  food.displayFood();
};

export default { attachDropdownEvents, attachEvents };
