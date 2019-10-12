/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import globalStyle from '../Style';

class Login extends React.Component {
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
    const { navigation } = this.props;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Main'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { errorMessage, email, password } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        {errorMessage && (
        <Text style={{ color: 'red' }}>
            {errorMessage}
        </Text>
        )}
        <View style={globalStyle.loginInputContainer}>
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
        <Button title="Login" onPress={this.handleSignUp} />
        <Button
          title="Switch to Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
