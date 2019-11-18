// import $ from 'jquery';
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const loginButton = $('#auth');
// const logoutButton = $('#navbar-button-logout');

// const attachEvents = () => {
//   logoutButton.click((e) => {
//     e.preventDefault();
//     firebase.auth().signOut()
//       .then(() => {
//       }).catch((err) => console.error('you still logged in', err));
//   })
//   loginButton.click((e) => {
//     e.preventDefault();
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
//       .then(() => {
//       }).catch((err) => console.error('you logged out', err));
//   })
// };

// export default { attachEvents };
