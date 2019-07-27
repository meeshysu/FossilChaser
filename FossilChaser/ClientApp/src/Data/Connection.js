import firebase from 'firebase';
import apiKeys from '../apiKeys';


const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys);
  }
};

export default firebaseApp;