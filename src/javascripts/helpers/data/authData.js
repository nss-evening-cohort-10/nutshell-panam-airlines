import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import food from '../../components/foodService/foodService';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see login button
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      food.createFoodCards();
    } else {
      // nobody logged in SHOW login button
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      food.createFoodCards();
    }
  });
};

export default { checkLoginStatus };
