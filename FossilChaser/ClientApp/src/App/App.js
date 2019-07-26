import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../components/MyNavbar/Navbar';
import Map from '../components/Map/Map';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className="App">
      <BrowserRouter>
        <React.Fragment>
        <Navbar />
          <Switch>
            {/* <Map /> */}
           <Route exact path='/' component={Map} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
    );
  }
}