import axios from 'axios';

const postUserFavoriteRequest = (userFavoriteInfo) => axios.post(`/api/userFavorite`, userFavoriteInfo);

const getUserFavoriteRequest = () => new Promise((resolve, reject) => {
    axios
      .get(`/api/userFavorite/getAllUserFavorites`)
      .then((res) => {
        let userFavorite = res.data;
        console.log(userFavorite);

        resolve(userFavorite);
      })
      .catch(err => reject(err));
  });

const getSingleUserRequest = () => new Promise((resolve, reject) => {
  axios
  .get(`api/userFavorite/getSingleUserFavorite/id`)
  .then((res) => {
    let getuserFavorite = res.data;
    resolve(getuserFavorite);
  })
  .catch(err => reject(err))
});

const updateUserFavorite = userObject => axios.put(`api/userFavorite/updateUserFavorite/id`, userObject);

const deleteUserFavorite = favoriteId => axios.delete(`api/userFavorite/deleteUserFavorite/${favoriteId}`);

export default {
  postUserFavoriteRequest,
  getUserFavoriteRequest,
  updateUserFavorite,
  getSingleUserRequest,
  deleteUserFavorite
}