import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import 'bootstrap';
import planesData from './helpers/data/planesData';
import planes from './components/Planes/planes';
import '../styles/main.scss';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  planesData.getPlanesByPlaneId();
  planes.buildPlanes();
};
init();
