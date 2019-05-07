import React, { Component } from 'react'
import { FlatList, View, StatusBar } from 'react-native'
// import { SearchBar } from "react-native-elements"
import SearchBar from 'react-native-searchbar'
import { contains } from '../../Config/constants'
import _ from 'lodash'

import ListItem from '../../Components/List/ListItem'
import SearchHeader from '../../Components/Buttons/SearchHeader'

import { currencies, flagUrl, flagBTC, flagXAG, flagXAU, flagXDR, url } from '../../Assets/resources/data';
import { Colors } from '../../Assets/Themes'
import loupe from '../../Assets/Icons/magnifier.png'

class CurrencyList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      // headerTitle: 'ForExchange',
      headerTitle: params.handleThis ? params.animation : 'Currencies',
      headerRight: (
        <SearchHeader
          onPress={() => params.handleThis()}
          source={loupe} />
      ),
      headerStyle: {
        backgroundColor: Colors.primary,
      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Lucida-Grande-Bold',
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataloaded: false,
      data: [],
      fullData: [],
      text: '',
      query: '',
      anim: false,
    };
  };
  componentDidMount() {
    this.setState({
      data: [...currencies],
      fullData: [...currencies],
    })
    this.props.navigation.setParams({
      handleThis: this.animate,
      handleAnim: this.state.anim,
      animation: this._animation
    });
  }

  animate = () => {
    this.searchBar.show()
    this.setState({
      anim: true
    })
  }
  _animation = () => {
    return (
      <SearchBar
        ref={(ref) => this.searchBar = ref}
        data={this.state.data}
        backgroundColor="transparent"
        textColor='white'
        fontFamily="Lucida-Grande"
        hideBack={true}
        hideX={true}
        handleChangeText={(text) => this.handleSearch(text)}
        showOnLoad
      />
    )
  }

  handleFlag = (currency) => {
    if (currency.hasOwnProperty('flag')) {
      return currency.flag ? `${flagUrl}/${currency.flag}.png` : null;
    } else {
      switch (currency.code) {
        case 'BTC':
          return flagBTC;
        case 'XDR':
          return flagXDR;
        case 'XAU':
          return flagXAU;
        case 'XAG':
          return flagXAG;
        default:
          return `${flagUrl}/${currency.code.substr(0, 2)}.png`;
      }
    }
  };

  goBack = (baseCurrency) => {
    const { navigation } = this.props
    navigation.goBack();
    navigation.state.params.setBaseCurrency({ baseCurrency: baseCurrency })
  }

  handleSearch = (text) => {
    const searchQuery = text.toLowerCase()
    const data = _.filter(this.state.fullData, currency => {
      return contains(currency, searchQuery)
    })
    this.setState({
      query: searchQuery,
      data,
    })
  }
  renderSeparator = () =>
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: Colors.lightGray,
      }}
    />
  keyExtractor = (item, index) => index.toString()
  oneScreensWorth = 30
  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.code}
              subtitle={item.name}
              avatar={{ uri: this.handleFlag(item) }}
              onPress={() => this.goBack(item.code)}
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