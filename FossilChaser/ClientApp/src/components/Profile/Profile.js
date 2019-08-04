// import React from 'react';
// import authRequests from '../../Data/authRequest';
// import userFavoriteRequest from '../../Data/userFavoriteRequest';
// import formationRequest from '../../Data/formationRequest';
// import userRequests from '../../Data/UserRequest';
// import MyPopup from '../Popup/Popup';

// const defaultFavorite = {
//   id: 0,
//   userId: 0,
// }

// const defaultUser = {
//   id: 0,
//   email: ''
// }

// const defaultFormation = {
//   id: 0,
//   formationName: '',
//   formationLocation: ''
// }

// class Profile extends React.Component {
//   state = {
//     formations: [],
//     favorite: defaultFavorite,
//     user: defaultUser
//   }

//   componentDidMount() {
//     this.getAllFavorites();
//     this.getUser();
//     this.getFormations();
//   }

//   getAllFavorites = () => {
//     const userFavId = this.props.match.params.id;
//     userFavoriteRequest.getSingleUserRequest(userFavId)
//       .then((result) => {
//         const favorite = result.data;
//         this.setState({ favorite })
//       })
//       .catch(err => console.error('error with getting favorites', err));
//   }

//   getUser = () => {
//     userRequests.getUserByEmail()
//       .then((user) => {
//         this.setState({ user });
//       })
//       .catch(err => console.error('error with getting users', err));
//   }

//   render() {
//     const { formation } = this.props;

//     return (
//       <MyPopup key={formation.id} formation={formation}>
//         FormationName={formation.formationName}
//         Location={formation.location}
//       </MyPopup>
//     )
//   }
// }

// export default Profile 
