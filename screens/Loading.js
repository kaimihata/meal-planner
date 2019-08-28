/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import globalStyle from '../Style';

class Loading extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'Main' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={globalStyle.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Loading;
