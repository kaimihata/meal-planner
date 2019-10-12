/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import DisplayResults from '../functions/DisplayResults';
import globalStyle from '../Style';
import layout from '../constants/Layout';
import getEnvVars from '../environment';

const RESULTS_TO_SHOW = 2;

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      query: '',
      loading: false,
    };
  }

  search = () => {
    const { SPOONACULAR_API_KEY } = getEnvVars();
    const { query } = this.state;
    const { navigation } = this.props;
    const q = query;
    const queries = q.split(' ');
    let string = queries[0];
    for (let i = 1; i < queries.length; i += 1) {
      string += `,${queries[i]}`;
    }
    this.setState({ loading: true });
    fetch(`https://api.spoonacular.com/recipes/search?apiKey=${SPOONACULAR_API_KEY}&query=${string}&number=${RESULTS_TO_SHOW}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const resp = responseJson;
        resp.navigation = navigation;
        this.setState({
          data: resp,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  render() {
    const { data, query, loading } = this.state;
    return (
      <View>
        <View style={globalStyle.searchScreenSearchContainer}>
          <TextInput
            style={[globalStyle.singleLineTextInput, globalStyle.searchScreenSearchBar]}
            placeholder="Search"
            value={query}
            onChange={(event) => { this.setState({ query: event.nativeEvent.text }); }}
            onSubmitEditing={(q) => this.search(q)}
          />
        </View>
        <View style={{ height: layout.window.height - 129 }}>
          <ScrollView
            contentContainerStyle={globalStyle.recipeCardScrollView}
            keyboardDismissMode="on-drag"
          >
            {loading && <ActivityIndicator />}
            <DisplayResults data={data} query={query} loading={loading} number={RESULTS_TO_SHOW} />
          </ScrollView>
        </View>

      </View>
    );
  }
}

SearchScreen.navigationOptions = {
  header: null,
  title: 'Search',
};

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(SearchScreen);
