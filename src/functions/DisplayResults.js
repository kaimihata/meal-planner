/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recipe from '../components/Recipe';
import globalStyle from '../Style';

class DisplayResults extends Component {
  createComponents = () => {
    const { number, data } = this.props;
    if (number === undefined || data === undefined) {
      return (<Text style={{ fontFamily: 'oxygen', fontSize: 20 }}>Search for Recipes</Text>);
    }
    const { results, navigation } = data;
    if (number === 0) {
      return (
        <Text>Sorry, couldn&apos;t find anything</Text>
      );
    }
    const elements = [];
    for (let i = 0; i < number; i += 1) {
      if (results[i] !== undefined) {
        elements.push(
          <Recipe
            key={results[i].id}
            id={results[i].id}
            image={results[i].image}
            imageUrls={results[i].imageUrls}
            readyInMinutes={results[i].readyInMinutes}
            servings={results[i].servings}
            title={results[i].title}
            navigation={navigation}
          />,
        );
      }
    }
    return (
      <View>{elements}</View>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[style, globalStyle.displayResultsBottom]}>
        {this.createComponents()}
      </View>
    );
  }
}

DisplayResults.propTypes = {
  style: PropTypes.shape(),
  number: PropTypes.number,
  data: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

DisplayResults.defaultProps = {
  navigation: undefined,
  data: undefined,
  number: undefined,
  style: undefined,
};

const mapStateToProps = (state) => ({
  savedResults: state.recipes,
});

export default connect(
  mapStateToProps,
)(DisplayResults);
