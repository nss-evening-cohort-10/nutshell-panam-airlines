import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
