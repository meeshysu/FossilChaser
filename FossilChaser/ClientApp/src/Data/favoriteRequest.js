// import axios from 'axios';

// const apiUrl = '/api/favorite';

// const createFavoriteFormation = favoriteFormation => axios.post(`${apiUrl}`, favoriteFormation);

// const getAllFavFormations = () => new Promise((resolve, reject) => {
//   axios
//     .get(`api/favorite/getAllFavorites`)
//     .then((results) => {
//       const favoriteFormation = results.data;
//       resolve(favoriteFormation);
//     })
//     .catch(err => reject(err));
// });

// const getSingleFavorite = favoriteId => new Promise((resolve, reject) => {
//   axios.get(`${apiUrl}/${favoriteId}`)
//     .then((result) => {
//       const singleLikedFavorite = result.data;
//       singleLikedFavorite.id = favoriteId;
//       resolve(singleLikedFavorite);
//     }).catch(err => reject(err));
// });

// const deleteFavorite = favoriteId => axios.delete(`${apiUrl}/${favoriteId}`);


// export default {
//   createFavoriteFormation,
//   deleteFavorite,
//   getSingleFavorite,
//   getAllFavFormations,
// };