import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const loginButton = $('#auth');
const logoutButton = $('#navbar-button-logout');

// // make for everyone
// const hideCardFunctionality = () => {
//   const deleteBtn = $('.delete');
//   const editBtn = $('.edit');
//   for (let i = 0; i < deleteBtn.length; i += 1) {
//     $('.delete').addClass('hide');
//   }
//   for (let i = 0; i < editBtn.length; i += 1) {
//     $('.edit').addClass('hide');
//   }
// };

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see login button
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
    } else {
      // nobody logged in SHOW login button
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      // hideCardFunctionality();
    }
  });
};

export default { checkLoginStatus };
