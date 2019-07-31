import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, function (err) {
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  return response;
}, (errorResponse) => {
  console.error(errorResponse, 'Blew up');
});

const loginUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

const getUserEmail = () => firebase.auth().currentUser.email;


const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {
  getUserEmail,
  loginUser,
  logoutUser,
  getUid
};