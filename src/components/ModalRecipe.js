/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ModalRecipe = (props) => {
  const { day, recipes } = props;
  if (day === undefined) {
    return <Text>Error</Text>;
  }
  return (
    <View>
      <Text>{recipes[day.dateString].title}</Text>
      <Text>{recipes[day.dateString].image}</Text>
      <Text>{recipes[day.dateString].servings}</Text>
    </View>
  );
};

ModalRecipe.propTypes = {
  day: PropTypes.shape(),
  recipes: PropTypes.shape(),
};

ModalRecipe.defaultProps = {
  day: undefined,
  recipes: undefined,
};

const mapStateToProps = (state) => ({
  recipes: state.Calendar.recipes,
});

export default connect(mapStateToProps)(ModalRecipe);
