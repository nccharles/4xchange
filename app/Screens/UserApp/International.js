import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, AsyncStorage
} from 'react-native';
import { userChoice } from '../../Config/constants'

import { Colors } from '../../Assets/Themes'

import Card from '../../Components/Card/InternationalCard'
import InputButton from '../../Components/InputButton/InternationalInputBtn'
import Toast, { DURATION } from 'react-native-easy-toast'
import {
  currencies, flagUrl, flagBTC, flagXAG, flagXAU, flagXDR, url
} from '../../Assets/resources/data';
import logout from '../../Assets/Icons/logout.png'

import LastConverted from '../../Components/Text/LastConverted';
import styles from './Style/shared-styles';

let data;
class International extends Component {

  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: currencies[149].code,
      userEntered: 1.00, currencies,
    };
  };

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

  async componentWillMount() {
    this.convertCurrency(this.state.userEntered, this.state.baseCurrency);
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
  };

  async convertCurrency(userEntered, baseCurrency) {
    if (!data) {
      await fetch(url)
        .then(res => res.json()).then(res => {
          data = res
        }).catch(error => {
          this.setState({ error, success: false });
        });
    }
    const { rates } = data
    let results = [];
    if (rates) {
      Object.keys(rates).forEach((quoteCurrency) => {
        results.push((rates[quoteCurrency] / rates[baseCurrency]) * userEntered);
      })
      for (let index in currencies) {
        currencies[index].res = results[index].toFixed(2)
      }
    }
    this.setState({
      currencies, userEntered, baseCurrency,
      success: data.success, date: data.date
    });
  };
  setBaseCurrency = async (currency) => {
    const { baseCurrency } = currency
    this.setState({
      baseCurrency: baseCurrency,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <InputButton
            text='Enter Amount ...'
            onPress={() => this.props.navigation.navigate('CurrencyList', { setBaseCurrency: this.setBaseCurrency })}
            buttonText={this.state.baseCurrency + '   '}
            editable={true}
            defaultValue='1.00'
            keyboardType="numeric"
            onChangeText={(value) => this.convertCurrency(value, this.state.baseCurrency)}
          />
        </View>
        {
          this.state.success ? null :
            <ActivityIndicator color={Colors.primary} animating size="large" />
        }
        <FlatList
          style={styles.list}
          data={this.state.currencies}
          renderItem={({ item }) => (
            <Card
              title={item.code}
              subtitle={item.name}
              hideAvatar={false}
              roundAvatar={false}
              avatar={{ uri: this.handleFlag(item) }}
              onPress={() => this.convertCurrency(this.state.userEntered, item.code)}
              rightComponentText={item.res}
            />
          )}
          keyExtractor={item => item.code}
          keyboardShouldPersistTaps='never'
          extraData={this.state}
          initialNumToRender={50}
          onEndReachedThreshold={30}
        />
        <LastConverted lastUpdated={this.state.date} />
        <Toast ref="toast"
          style={{ backgroundColor: Colors.primary }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: '#fff' }} />
      </View>
    );
  }
}

export default International;
