/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import globalStyle from '../Style';

export default class DisplayInstructions extends Component {
  createComponents = () => {
    const { instructions } = this.props;
    if (instructions === null || instructions === undefined) {
      return (
        <Text>Loading...</Text>
      );
    }
    if (instructions[0] === undefined) {
      return (
        <Text style={globalStyle.step}>Sorry, couldn&apos;t find instructions</Text>
      );
    }
    const elements = [];
    let [steps] = instructions;
    steps = steps.steps;
    for (let i = 0; i < steps.length; i += 1) {
      elements.push(
        <Text style={globalStyle.step} key={i}>{`${i + 1}. ${steps[i].step}`}</Text>,
      );
    }
    return elements;
  }

  render() {
    return (
      <View>
        {this.createComponents()}
      </View>
    );
  }
}

DisplayInstructions.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.shape()),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

DisplayInstructions.defaultProps = {
  instructions: undefined,
  navigation: undefined,
};
