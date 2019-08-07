import axios from 'axios';

const apiUrl = '/api/favorite';

const createFormation = newFormation => axios.post(`${apiUrl}`, newFormation);

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`/api/formation/getAllFormations`)
    .then((res) => {
       const formation = res.data;
      resolve(formation);
    })
    .catch(err => reject(err));
});

const getSingleFormation = id => new Promise((resolve, reject) => {
  axios
    .get(`/api/formation/getSingleFormation/${id}`)
    .then((res) => {
      let form = res.data;
      console.log(form)
      resolve(form);
    })
    .catch(err => reject(err));
});



export default {
  getRequest,
  getSingleFormation,
  createFormation,
};