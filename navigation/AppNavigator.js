/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import {
  Text,
} from 'react-native';

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

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthStack,
    Main: MainTabNavigator,
  },
  { initialRouteName: 'Auth' }),
);
