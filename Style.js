import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  recipeCardScrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  singleLineTextInput: {
    fontFamily: 'oxygen',
    height: 40,
    width: '90%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  signUpInputContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  searchScreenSearchContainer: {
    alignItems: 'center',
    marginTop: '6%',
    paddingTop: 10,
  },
  searchScreenSearchBar: {
    fontSize: 24,
  },
  searchScreenResults: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
  favoritesScreenHead: {
    height: 80,
    alignItems: 'center',
  },
  favoritesScreenBorder: {
    height: 80,
    width: '90%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  favoritesScreenHeaderText: {
    paddingTop: 30,
    fontFamily: 'oxygen',
    fontSize: 24,
  },
  loginInputContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredient: {
    fontFamily: 'oxygen',
    fontSize: 18,
    color: '#A3A3A3',
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 25,
  },
  step: {
    fontFamily: 'oxygen',
    fontSize: 18,
    color: '#A3A3A3',
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 25,
  },
  displayResultsBottom: {
    paddingBottom: 0,
    marginBottom: 0,
    paddingEnd: 0,
    marginEnd: 0,
  },
});
