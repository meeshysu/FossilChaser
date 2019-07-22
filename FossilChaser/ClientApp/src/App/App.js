import React, { Component } from 'react';
import { Route } from 'react-router';
import Map from '../components/Pages/Map/Map';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Route exact path='/' component={Map} />
    );
  }
}