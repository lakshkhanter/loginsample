import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation'

import Login from './src/components/Screens/Login';
import Main from './src/components/Screens/Main';
import Signup from './src/components/Screens/Signup';

const Application = StackNavigator({
  Login : { screen: Login },
  Main: { screen: Main},
  Signup: { screen: Signup}
}, {
  navigationOptions: {
    header: null,
  }
});

export default class App extends Component {
  render() {
    return (
      
      
      <Application />
      
    );
  }
}

