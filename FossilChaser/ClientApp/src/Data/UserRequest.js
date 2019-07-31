import axios from 'axios';
//import apiKeys from '../apikeys';
import authRequests from '../Data/authRequest';



const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`api/user/getAllUsers`)
    .then((result) => {
      if (result != null) {
        const allUsers = result.data;
        console.log(allUsers)
        resolve(allUsers);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserProfile = id => new Promise((resolve, reject) => {
  axios
    .get(`/api/user/getSingleUser/id`)
    .then((res) => {
      let user = res.data;
      console.log(user)
      resolve(user);
    })
    .catch(err => reject(err));
});


const getUserByEmail = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      console.log(users)
      resolve(currentUser);
    })
    .catch((error) => {
      reject(error);
    });
});

//const addUser = userObject => axios.post(`api/user`, userObject);

const updateUser = userObject => axios.put(`api/user/updateUser/id`, userObject);

export default {
  getUserProfile,
  getUserByEmail,
  getAllUsers,
  updateUser,
};