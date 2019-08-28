/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Icon,
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DisplayIngredients from '../functions/DisplayIngredients';
import DisplayInstructions from '../functions/DisplayInstructions';
import firebase, { firestore } from '../firebase';
import getEnvVars from '../environment';
import globalStyle from '../Style';

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 375,
    paddingBottom: 0,
    marginBottom: 0,
  },
  textContainer: {
    padding: 0,
    margin: 0,
  },
  backButton: {
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 5,
  },
  favorites: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: 10,
  },
  title: {
    fontFamily: 'oxygen',
    fontSize: 28,
    color: '#707070',
    paddingBottom: 0,
    paddingTop: 15,
    lineHeight: 40,
    marginBottom: -10,
  },
  subtitle: {
    fontFamily: 'oxygen',
    fontSize: 18,
    color: '#A3A3A3',
    paddingTop: 0,
    marginTop: 0,
  },
  ingredientContainer: {
    paddingLeft: 30,
    paddingBottom: 30,
  },
  ingredientHeader: {
    fontFamily: 'oxygen',
    fontSize: 18,
    color: '#707070',
  },
});

class RecipeDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      data: '',
      instructions: '',
    };
  }

  componentDidMount() {
    // console.log('props',this.props.state);
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;
    const path = firestore.collection('users').doc(currentUser.uid).collection('favorites');
    const id = navigation.getParam('id', '0').toString();
    path.doc(id).get().then((doc) => {
      if (doc.exists) {
        this.setState({
          favorite: doc.data().favorite,
          data: doc.data(),
          instructions: doc.data().instructions,
        });
      } else {
        this.loadRecipe();
      }
    }).catch((error) => {
      console.log('Error getting document', error);
    });
  }

  loadRecipe = () => {
    const { navigation } = this.props;
    const { SPOONACULAR_API_KEY } = getEnvVars();
    const id = navigation.getParam('id', '0');

    // Get ingredients
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });
      })
      .catch((error) => {
        console.log('Error loading recipe ingredients', error);
      });

    // Get analyzed instructions
    fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // console.log("Setting state to response");
        this.setState({
          instructions: responseJson,
        });
      })
      .catch((error) => {
        console.log('Error loading recipe instructions', error);
      });
  }

  addToFavorites = () => {
    const { currentUser } = firebase.auth();
    const { data, favorite, instructions } = this.state;
    this.setState((prevState) => ({
      favorite: !prevState.favorite,
    }));
    const path = firestore.collection('users').doc(currentUser.uid).collection('favorites');
    const id = data.id.toString();
    if (favorite === false) {
      // SAVE DATA IN FAVORITES
      // console.log('add2fav data',this.state.data);
      // console.log('add2fav instructions',this.state.instructions);

      const docRef = path.doc(id);
      docRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          // Document already exists
          docRef.set({
            favorite: true,
          }, { merge: true });
        } else {
          // Document does not exist yet
          docRef.set({ ...data });
          docRef.set({
            favorite: true,
            instructions,
          }, { merge: true });
        }
      });
    } else {
      // REMOVE DATA FROM FAVORITES
      path.doc(id).update({
        favorite: false,
      });
    }
  };

  render() {
    const { data, instructions, favorite } = this.state;
    const { navigation } = this.props;
    let title = '';
    if (data !== '') {
      [title] = data.title.split('–');
    }
    // console.log(this.props);)
    // console.log("render",this.state.data);
    if (data === '' || instructions === '') {
      return (
        <View style={globalStyle.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    // console.log('data', this.state.data);
    // console.log('instructions', this.state.instructions);
    return (
      <ScrollView contentContainerStyle={{ marginTop: 20 }}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ url: data.image }} style={styles.image}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
              type="ionicon"
              color="#ffffff"
              style={styles.backButton}
              size={50}
              onPress={() => navigation.goBack()}
            />
          </ImageBackground>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>
                {data.readyInMinutes}
                {' minutes, Serves '}
                {data.servings}
              </Text>
            </View>
            <View style={styles.favorites}>
              <Icon
                name={favorite ? 'ios-heart' : 'ios-heart-empty'}
                type="ionicon"
                color="#707070"
                size={35}
                onPress={this.addToFavorites}
              />
            </View>
          </View>
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientHeader}>Ingredients</Text>
            <DisplayIngredients
              ingredients={data.extendedIngredients}
              len={data.extendedIngredients.length}
              instructions={instructions}
            />
            <Text style={styles.ingredientHeader}>Instructions</Text>
            <DisplayInstructions
              instructions={instructions}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

RecipeDetailScreen.navigationOptions = {
  header: null,
};

RecipeDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

RecipeDetailScreen.defaultProps = {
  navigation: undefined,
};

export default RecipeDetailScreen;
