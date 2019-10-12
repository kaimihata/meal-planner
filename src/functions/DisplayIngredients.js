/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import globalStyle from '../Style';

export default class DisplayIngredients extends Component {
  createComponents = () => {
    const { ingredients, len } = this.props;
    if (ingredients == null) {
      return (
        <Text>Loading...</Text>
      );
    }
    const elements = [];
    for (let i = 0; i < len; i += 1) {
      const ing = ingredients[i];
      let { name } = ing;
      if (ing.original.length < 15) {
        name = ing.original;
      } else {
        name = `${ing.measures.us.amount} ${ing.measures.us.unitShort} ${ing.name}`;
      }
      elements.push(
        <Text style={globalStyle.ingredient} key={ing.name}>{name}</Text>,
      );
    }
    return elements;
  };

  render() {
    return (
      <View>
        {this.createComponents()}
      </View>
    );
  }
}

DisplayIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()),
  len: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

DisplayIngredients.defaultProps = {
  ingredients: undefined,
  navigation: undefined,
};
