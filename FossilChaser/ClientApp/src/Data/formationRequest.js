import axios from 'axios';

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`/api/formation/getAllFormations`)
    .then((res) => {
       const formation = res.data;
      resolve(formation);
    })
    .catch(err => reject(err));
});



export default {
  getRequest
};