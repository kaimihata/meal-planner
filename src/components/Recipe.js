/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
    marginBottom: 25,
    paddingBottom: 10,
    width: 325,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 20,
  },
  image: {
    width: 325,
    height: 144,

  },
  imageView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  title: {
    fontFamily: 'oxygen',
    lineHeight: 37,
    color: '#707070',
    fontSize: 24,
  },
  subtitle: {
    fontFamily: 'oxygen',
    color: '#A3A3A3',
    fontSize: 18,
  },
});

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  nav = () => {
    const { navigation, onNav } = this.props;
    const { navigate } = navigation;
    if (onNav !== undefined) {
      onNav();
    }
    navigate('Detail', { ...this.props });
  }

  render() {
    const {
      image, title, readyInMinutes, servings, extraComponent,
    } = this.props;
    let img = `https://spoonacular.com/recipeImages/${image}`;
    if (image.includes('http')) {
      img = image;
    }
    return (
      <TouchableOpacity onPress={() => this.nav()}>
        <View style={styles.outerContainer}>
          <View style={styles.imageView}>
            <Image source={{ url: img }} style={styles.image} />
          </View>
          <View style={styles.description}>
            <Text style={styles.title}>{title.split('–')[0]}</Text>
            <Text style={styles.subtitle}>{`${readyInMinutes} minutes, Serves ${servings}`}</Text>
            {extraComponent !== undefined && extraComponent}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Recipe.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  readyInMinutes: PropTypes.number,
  servings: PropTypes.number,
  onNav: PropTypes.func,
  extraComponent: PropTypes.shape(),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

Recipe.defaultProps = {
  image: '',
  title: '',
  readyInMinutes: 0,
  servings: 0,
  navigation: undefined,
  onNav: undefined,
  extraComponent: undefined,
};


export default withNavigation(Recipe);
