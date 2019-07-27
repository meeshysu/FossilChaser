import axios from 'axios';


const getUserProfile = uid => new Promise((resolve, reject) => {
  axios
    .get(`api/user/${uid}`)
    .then((res) => {
      let user = res.data;
      resolve(user);
    })
    .catch(err => reject(err));
});

const postUser = (user) => axios.post(`/api/formation/getAllUsers`, user);

const updateUser = (customer) => axios.put(`/api/customer/${customer}`, customer);

export default {
  postUser,
  getUserProfile,
  updateUser
}