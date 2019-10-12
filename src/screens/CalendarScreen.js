/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  changeMealEvent,
  addRecipeToCalendar,
  removeRecipeFromCalendar,
  incQueryNumber,
} from '../actions';
import layout from '../constants/Layout';
import globalStyle from '../Style';
import firebase, { firestore } from '../firebase';
import getEnvVars from '../environment';
import Recipe from '../components/Recipe';

const style = StyleSheet.create({
  calendarModalContainer: {
    height: layout.window.height,
    width: layout.window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarModalBox: {
    width: '80%',
    height: '50%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 20,
  },
  calendarFormRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  calendarFormTextSelected: {
    color: 'blue',
  },
  calendarFormTextUnselected: {
    color: 'black',
  },
  calendarFormTextContainer3: {
    width: '32%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  calendarFormTextContainer2: {
    width: '40%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  deleteButton: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  deleteButtonText: {
    fontFamily: 'oxygen',
    color: '#c93030',
    fontSize: 18,
  },
});

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDay: {},
      mealTypeSelected: 1,
      recipeTypeSelected: 1,
      generateModalVisible: false,
      detailModalVisible: false,
    };
  }

  showModal = (day) => {
    const {
      markedDays,
    } = this.props;
    const str = day.dateString;
    if (markedDays[str] === undefined || markedDays[str].marked === false) {
      this.setState({ generateModalVisible: true });
    } else {
      this.setState({ detailModalVisible: true });
    }
  }

  generateRecipe = async (markedDay, mealType, recipeType) => {
    const {
      changeMealEvent,
      addRecipeToCalendar,
      queryNumber,
      incQueryNumber,
    } = this.props;
    const { currentUser } = firebase.auth();
    const { SPOONACULAR_API_KEY } = getEnvVars();
    const change = { date: markedDay.dateString, bool: true };
    changeMealEvent(change);
    this.setState({ generateModalVisible: false });
    const options = [];
    let recipe = {};
    if (recipeType === 0) {
      // eslint-disable-next-line no-unused-vars
      const x = await firestore.collection('users').doc(currentUser.uid).collection('favorites').where('favorite', '==', true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              const ref = doc.data();
              const rec = {
                key: ref.id,
                id: ref.id,
                image: ref.image,
                readyInMinutes: ref.readyInMinutes,
                servings: ref.servings,
                title: ref.title,
                dishTypes: ref.dishTypes,
              };
              options.push(rec);
            }
          });
        })
        .catch((error) => error);
      // console.log(options);

      // Randomly choose a recipe from options
      recipe = options[Math.floor(Math.random() * options.length)];
      // console.log(recipe);
      // Save the recipe id with the date in the local store
      // Save the full recipe to the local store if it is not already
    // }
    } else {
      const mealTypes = ['side dish', 'main course', 'dessert'];
      const mealTypeQuery = mealTypes[mealType];
      // eslint-disable-next-line no-unused-vars
      const results = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${SPOONACULAR_API_KEY}&type=${mealTypeQuery}&offset=${queryNumber[mealType]}&number=1`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.results.forEach((element) => {
            options.push(element);
            // console.log(element);
          });
          return responseJson;
        })
        .catch((error) => error);
      [recipe] = options;
      incQueryNumber(mealType);
    }
    addRecipeToCalendar(markedDay.dateString, recipe);
    // this.setState({ detailModalVisible: true });
  }

  deleteRecipe = (day) => {
    const {
      changeMealEvent,
      removeRecipeFromCalendar,
    } = this.props;
    const change = { date: day.dateString, bool: false };
    changeMealEvent(change);
    removeRecipeFromCalendar(day.dateString);
    this.setState({ detailModalVisible: false });
  };

  render() {
    const {
      mealTypeSelected,
      recipeTypeSelected,
      markedDay,
      generateModalVisible,
      detailModalVisible,
    } = this.state;
    const {
      markedDays,
      recipes,
      navigation,
    } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent
          visible={generateModalVisible}
        >
          <TouchableOpacity
            style={style.calendarModalContainer}
            activeOpacity={1}
            onPressOut={() => this.setState({ generateModalVisible: false })}
          >
            <TouchableWithoutFeedback>
              <View style={style.calendarModalBox}>
                <Text style={globalStyle.favoritesScreenHeaderText}>Plan a Meal</Text>
                <View style={style.calendarFormRow}>
                  <View style={style.calendarFormTextContainer3}>
                    <TouchableOpacity onPress={() => { this.setState({ mealTypeSelected: 0 }); }}>
                      <Text
                        style={mealTypeSelected === 0
                          ? style.calendarFormTextSelected : style.calendarFormTextUnselected}
                      >
                        Side
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.calendarFormTextContainer3}>
                    <TouchableOpacity onPress={() => { this.setState({ mealTypeSelected: 1 }); }}>
                      <Text
                        style={mealTypeSelected === 1
                          ? style.calendarFormTextSelected : style.calendarFormTextUnselected}
                      >
                        Main
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.calendarFormTextContainer3}>
                    <TouchableOpacity onPress={() => { this.setState({ mealTypeSelected: 2 }); }}>
                      <Text
                        style={mealTypeSelected === 2
                          ? style.calendarFormTextSelected : style.calendarFormTextUnselected}
                      >
                        Dessert
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={style.calendarFormRow}>
                  <View style={style.calendarFormTextContainer2}>
                    <TouchableOpacity onPress={() => { this.setState({ recipeTypeSelected: 0 }); }}>
                      <Text
                        style={recipeTypeSelected === 0
                          ? style.calendarFormTextSelected : style.calendarFormTextUnselected}
                      >
                        Favorite
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={style.calendarFormTextContainer2}>
                    <TouchableOpacity onPress={() => { this.setState({ recipeTypeSelected: 1 }); }}>
                      <Text
                        style={recipeTypeSelected === 1
                          ? style.calendarFormTextSelected : style.calendarFormTextUnselected}
                      >
                        New Meal
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={
                    () => { this.generateRecipe(markedDay, mealTypeSelected, recipeTypeSelected); }
                  }
                >
                  <Text style={[globalStyle.favoritesScreenHeaderText, { color: 'blue' }]}>Generate Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                  () => { this.setState({ generateModalVisible: !generateModalVisible }); }
                }
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={detailModalVisible}
        >
          <TouchableOpacity
            style={style.calendarModalContainer}
            activeOpacity={1}
            onPressOut={() => this.setState({ detailModalVisible: false })}
          >
            <TouchableWithoutFeedback>
              <View>
                {/* <ModalRecipe navigation day={markedDay} /> */}
                {markedDay !== undefined
                && markedDay.dateString !== undefined
                && recipes[markedDay.dateString] !== undefined && (
                <Recipe
                  key={recipes[markedDay.dateString].id}
                  id={recipes[markedDay.dateString].id}
                  image={recipes[markedDay.dateString].image}
                  imageUrls={recipes[markedDay.dateString].imageUrls}
                  readyInMinutes={recipes[markedDay.dateString].readyInMinutes}
                  servings={recipes[markedDay.dateString].servings}
                  title={recipes[markedDay.dateString].title}
                  navigation={navigation}
                  onNav={() => this.setState({ detailModalVisible: false })}
                  extraComponent={(
                    <View style={style.deleteButton}>
                      <TouchableOpacity onPress={() => this.deleteRecipe(markedDay)}>
                        <Text style={style.deleteButtonText}>Delete Meal</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                )}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Calendar
          minDate="2019-01-01"
          onDayPress={(day) => {
            this.showModal(day);
            this.setState({ markedDay: day });
          }}
          markedDates={markedDays}
        />
      </View>
    );
  }
}

CalendarScreen.propTypes = {
  markedDays: PropTypes.shape(),
  recipes: PropTypes.shape(),
  changeMealEvent: PropTypes.func.isRequired,
  addRecipeToCalendar: PropTypes.func.isRequired,
  removeRecipeFromCalendar: PropTypes.func.isRequired,
  incQueryNumber: PropTypes.func.isRequired,
  queryNumber: PropTypes.arrayOf(PropTypes.number),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CalendarScreen.defaultProps = {
  markedDays: {},
  recipes: {},
  queryNumber: [0, 0, 0],
};

const mapStateToProps = (state) => ({
  markedDays: state.Calendar.markedDays,
  recipes: state.Calendar.recipes,
  queryNumber: state.RecipeStorage.queryNumber,
});

const mapDispatchToProps = (dispatch) => ({
  changeMealEvent: (day) => dispatch(changeMealEvent(day)),
  addRecipeToCalendar: (day, recipe) => dispatch(addRecipeToCalendar(day, recipe)),
  removeRecipeFromCalendar: (day) => dispatch(removeRecipeFromCalendar(day)),
  incQueryNumber: (index) => dispatch(incQueryNumber(index)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen));
