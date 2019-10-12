/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainTabNavigator from './MainTabNavigator';
import Loading from '../screens/Loading';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

const AuthStack = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: <Text style={{ fontFamily: 'oxygenBold', fontSize: 18 }}>Sign Up</Text>,
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: <Text style={{ fontFamily: 'oxygenBold', fontSize: 18 }}>Login</Text>,
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthStack,
    Main: MainTabNavigator,
  },
  { initialRouteName: 'Auth' }),
);

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

export default connect(
  null,
  actions,
)(AppNavigation);
