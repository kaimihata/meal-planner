/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
} from '../actions';
import Recipe from '../components/Recipe';
import firebase, { firestore } from '../firebase';

class DisplayFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  componentWillReceiveProps(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      this.loadFavorites();
    }
  }

  loadFavorites = async () => {
    try {
      const { currentUser } = firebase.auth();
      const { navigation } = this.props;
      const path = firestore.collection('users').doc(currentUser.uid).collection('favorites');
      const e = [];
      const nav = navigation;
      // eslint-disable-next-line no-unused-vars
      const x = await path.where('favorite', '==', true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              const ref = doc.data();
              if (
                ref.id !== undefined
                && ref.image !== undefined
                && ref.readyInMinutes !== undefined
                && ref.servings !== undefined
                && ref.title !== undefined
              ) {
                e.push(<Recipe
                  key={ref.id}
                  id={ref.id}
                  image={ref.image}
                  readyInMinutes={ref.readyInMinutes}
                  servings={ref.servings}
                  title={ref.title}
                  navigation={nav}
                />);
              }
            }
          });
        })
        .catch((error) => {
          console.log('loadFavorites error:', error);
        });
      this.setState({ elements: e });
    } catch (error) {
      console.log('try/catch error:', error);
    }
  }

  render() {
    const { elements } = this.state;
    return (
      <View>
        {elements}
      </View>
    );
  }
}

DisplayFavorites.propTypes = {
  refresh: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

DisplayFavorites.defaultProps = {
  refresh: undefined,
};

const mapStateToProps = (state) => ({
  savedRecipes: state.recipes,
});

export default connect(
  mapStateToProps,
)(DisplayFavorites);
