/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase, { firestore } from '../firebase';
import globalStyle from '../Style';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
  }

  handleSignUp = () => {
    const { email, password } = this.state;
    // authenticate user
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.initializeUser())
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  initializeUser = () => {
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;
    const count = {
      count: 0,
    };
    firestore.collection('users')
      .doc(currentUser.uid)
      .collection('favorites')
      .doc('count')
      .set(count);
    navigation.navigate('Main');
  }

  render() {
    const {
      errorMessage,
      email,
      password,
      navigation,
    } = this.state;
    return (
      <View>
        {errorMessage && (
          <Text style={{ color: 'red' }}>
            {errorMessage}
          </Text>
        )}
        <View style={globalStyle.signUpInputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={globalStyle.singleLineTextInput}
            onChangeText={(e) => this.setState({ email: e })}
            value={email}
            keyboardType="email-address"
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={globalStyle.singleLineTextInput}
            onChangeText={(p) => this.setState({ password: p })}
            value={password}
          />
        </View>
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Switch to Sign In"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
