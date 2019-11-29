import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import food from '../../components/foodService/foodService';
import crew from '../../components/crew/crew';
import airports from '../../components/Airports/airport';
import planes from '../../components/Planes/planes';
import menu from '../../components/Menus/menus';


const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see login button
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      crew.createCrewCard();
      food.createFoodCards();
      airports.buildAirports();
      planes.buildPlanes();
      menu.displayMenu();
    } else {
      // nobody logged in SHOW login button
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      crew.createCrewCard();
      food.createFoodCards();
      airports.buildAirports();
      planes.buildPlanes();
      menu.displayMenu();
    }
  });
};

export default { checkLoginStatus };
