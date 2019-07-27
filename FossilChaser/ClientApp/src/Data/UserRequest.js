import axios from 'axios';
//import apiKeys from '../apikeys';
import authRequests from '../Data/authRequest';



const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`api/user/getAllUsers`)
    .then((result) => {
      if (result != null) {
        const allUsers = result.data;
        resolve(allUsers);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserByEmail = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      resolve(currentUser);
    })
    .catch((error) => {
      reject(error);
    });
});

const addUser = userObject => axios.post(`api/user/id`, userObject);

const updateUser = userObject => axios.put(`api/user/id`, userObject);

export default {
  addUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
};