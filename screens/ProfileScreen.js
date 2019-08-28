/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View>
        <Text>
          Hi
          {currentUser && currentUser.email}
          !
        </Text>
        <Text>{currentUser && currentUser.uid}</Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
