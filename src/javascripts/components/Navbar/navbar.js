import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import airport from '../Airports/airport';
import crewMembers from '../crewMembers/crewMembers';
import food from '../foodService/foodService';
import auth from '../Auth/auth';
import planes from '../Planes/planes';

const displayHome = () => {
  $('#home-link').on('click', () => {
    $('#home').show();
    $('#airports').hide();
    $('#crew').hide();
    $('#foodModule').hide();
    $('#planes').hide();
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
  crewMembers.displayCrewMembers();
  food.displayFood();
  planes.displayPlanes();
};

export default { attachDropdownEvents, attachEvents };
