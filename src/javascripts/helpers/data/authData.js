import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import food from '../../components/foodService/foodService';
import crewMembers from '../../components/crewMembers/crewMembers';
import airports from '../../components/Airports/airport';
import planes from '../../components/Planes/planes';
import menuBuilder from '../../components/MenusBuilder/menusBuilder';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see login button
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      crewMembers.createCrewMemberCard();
      food.createFoodCards();
      airports.buildAirports();
      planes.buildPlanes();
      menuBuilder.displayAllMenus();
    } else {
      // nobody logged in SHOW login button
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      crewMembers.createCrewMemberCard();
      food.createFoodCards();
      airports.buildAirports();
      planes.buildPlanes();
      menuBuilder.displayAllMenus();
    }
  });
};

export default { checkLoginStatus };
