import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from '../components/MyNavbar/Navbar';
import Map from '../components/Map/Map';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/orders', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state={
    authed: false
  }

  componentDidMount() {
}

  componentWillUnmount () {
    this.removeListener();
  }

  runAway = () => {
    this.setState({authed: false});
  }

  render () {
    const {
      authed
    } = this.state 

    if (!authed) {
      return (
        <div className="App">
          <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
              component={Login}
            />
          <Route path="/" exact component={Login}/>  
          <PublicRoute
              path="/login"
              authed={this.state.authed}
              component={Login}
              />
          <PublicRoute
              path="/register"
              authed={this.state.authed}
              component={Register}
                  />
        </div>
      )
    }

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
                <Switch>
                  <Route path="/" exact component={Map}/>
                  <PrivateRoute path='/customerprofile' exact component={Map} authed={this.state.authed} />
                  <PrivateRoute path='/home' exact component={Profile} authed={this.state.authed} />
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;