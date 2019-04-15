import React, { Component } from 'react'
import { Text, FlatList, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
// import { SearchBar } from "react-native-elements"
import SearchBar from 'react-native-searchbar'
import { contains } from '../../Config/constants'
import _ from 'lodash'
import { Ionicons } from '@expo/vector-icons'

import ListItem from '../../Components/List/ListItem'
import HeaderBtn from '../../Components/Buttons/HeaderBtn'

import { currencies, flagUrl, flagBTC, flagXAG, flagXAU, flagXDR, url } from '../../Assets/resources/data';
import { Colors } from '../../Assets/Themes'
import loupe from '../../Assets/Icons/magnifier.png'
const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Select a country   ',
      headerStyle: {
        backgroundColor: Colors.primary,
      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Lucida-Grande-Bold',
      },
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false,
      refreshing: false,
      dataloaded: false,
      data: [],
      text: '',
      countries: []

    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onEnd = this.onEnd.bind(this);

  }
  onEnd() {
    if (this.state.dataloaded) {
      this.setState({ dataloaded: false });
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
          dataSource: responseData,
          loaded: true,
          refreshing: false,
          countries: responseData

        });
      })
      .done();
  }

  onRefresh() {
    this.setState({
      refreshing: true,
    });


    setTimeout(() => {

      this.setState({
        refreshing: false,
        dataloaded: true,
      });

    }, 200);
    this.fetchData();

  }

  renderSeparator = () =>
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  keyExtractor = (item, index) => index.toString()

  goBack = (countryName, countryFlag) => {
    // console.log(countryFlag)
    const { navigation } = this.props
    navigation.goBack();
    navigation.state.params.setCountry({ countryName: countryName, countryFlag: countryFlag })
  }

  oneScreensWorth = 30
  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.capital}
              svgFiles={true}
              avatar={item.flag}
              onPress={() => this.goBack(item.name, item.flag)}
            />
          )}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default CurrencyList;