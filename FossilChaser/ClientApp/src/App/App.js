import firebase from 'firebase';
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from '../components/MyNavbar/Navbar';
import Map from '../components/Map/Map';
import Profile from '../components/Profile/Profile';
import Connection from '../Data/Connection';
import Auth from '../components/Auth/Auth';
import authRequests from '../Data/authRequest';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/map', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    Connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const logoutClick = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (this.state.pendingUser) {
      return null;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar isAuthed={authed} logoutClick={logoutClick}/>
              <Switch>
                <PrivateRoute path='/' exact component={Map} authed={this.state.authed} />
                <PrivateRoute path='/map' component={Map} authed={this.state.authed} />
                <PrivateRoute path='/profile' component={Profile} authed={this.state.authed} />
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;