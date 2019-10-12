/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Text,
  View,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import DisplayFavorites from '../functions/DisplayFavorites';
import globalStyle from '../Style';
import layout from '../constants/Layout';

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      count: 0,
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.refreshFavorites();
    this.setState({ refreshing: false });
  }

  refreshFavorites = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  render() {
    const { refreshing, count } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <View style={globalStyle.favoritesScreenHead}>
          <View style={globalStyle.favoritesScreenBorder}>
            <Text style={globalStyle.favoritesScreenHeaderText}>Favorites</Text>
          </View>
        </View>
        <View style={{ height: layout.window.height - 129 }}>
          <ScrollView
            contentContainerStyle={globalStyle.recipeCardScrollView}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            )}
          >
            <DisplayFavorites navigation={navigation} refresh={count} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

FavoritesScreen.navigationOptions = {
  header: null,
};

FavoritesScreen.propTypes = {
  navigation: PropTypes.shape({
  }).isRequired,
};

export default withNavigation(FavoritesScreen);
