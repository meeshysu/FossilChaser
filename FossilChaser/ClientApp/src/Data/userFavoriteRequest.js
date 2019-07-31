import axios from 'axios';

const postUserFavoriteRequest = (userFavoriteInfo) => axios.post(`/api/userFavorite`, userFavoriteInfo);

const getUserFavoriteRequest = uid => new Promise((resolve, reject) => {
    axios
      .get(`/api/userFavorite/getUserFavorites/${uid}`)
      .then((res) => {
        let userFavorite = res.data;
        resolve(userFavorite);
      })
      .catch(err => reject(err));
  });

const updateUserFavorite = userObject => axios.put(`api/userFavorite/updateUserFavorite/id`, userObject);


export default {
  postUserFavoriteRequest,
  getUserFavoriteRequest,
  updateUserFavorite
}