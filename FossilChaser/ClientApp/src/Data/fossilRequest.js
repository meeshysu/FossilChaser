import axios from 'axios';

const postFossilRequest = (fossil) => axios.post(`/api/fossil`, fossil);

const getCoordinates = () => new Promise((resolve, reject) => {
    axios
      .get(`/api/fossil/getAllFossils`)
      .then((res) => {
        let fossilLink = res.data;
        console.log(fossilLink);
        resolve(fossilLink);
      })
      .catch(err => reject(err));
  });

  const getSingleFossil = id => new Promise((resolve, reject) => {
    axios
      .get(`/api/fossil/getFossil/${id}`)
      .then((res) => {
        let foss = res.data;
        console.log(foss)
        resolve(foss);
      })
      .catch(err => reject(err));
  });

  export default {
    postFossilRequest,
    getCoordinates,
    getSingleFossil
  }