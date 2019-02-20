import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, Button, TouchableHighlight, AsyncStorage,
  FlatList, Image, Animated, Modal, ActivityIndicator, Dimensions,
  TouchableOpacity, ToastAndroid, Alert
} from 'react-native';
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import styles from './Style/ListStyle'

import CategoryBtn from '../../Components/Buttons/BtnCategory'
import Card from '../../Components/Card/Card'
import InputButton from '../../Components/InputButton/InputButton'
import HeaderBtn from '../../Components/Buttons/HeaderBtn'
import { userChoice } from '../../Config/constants'
//firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
const initailState = {
  data: [],
  loading: true,
  inputedValue: 0,
  baseCurrency: 'USD',
  initialCurrency: null,
  buyBackgroundColor: 'transparent',
  buyTextColor: Colors.dark,
  sellBackgroundColor: 'transparent',
  sellTextColor: Colors.dark,
  category: 'Buy',
  isBuying: true,
  userData: [],
  showAlert: true,
  flag: 'https://restcountries.eu/data/rwa.svg',
  fav_icon: false,
  bureau: null
}

class Local extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    let Title = '4xChange   '
    return {
      headerTitle: Title + '   ',
      headerRight: (
        <HeaderBtn
          onPress={() => params.handleThis()}
          source={logout} />
      ),
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
      },
    }
  };


  constructor(props) {
    super(props);
    this.state = initailState
  };

  changeBtnBuy = () => {
    this.setState({
      buyBackgroundColor: Colors.dark,
      sellBackgroundColor: 'transparent',
      category: 'Buy   ',
      buyTextColor: 'white',
      sellTextColor: Colors.dark,
      initialCurrency: 'RWF',
      isBuying: true
    })
  }

  changeBtnSell = () => {
    this.setState({
      sellBackgroundColor: Colors.dark,
      buyBackgroundColor: 'transparent',
      category: 'Sell   ',
      sellTextColor: 'white',
      buyTextColor: Colors.dark,
      initialCurrency: this.state.baseCurrency,
      isBuying: false,
    })
  }

  _handleCurrencyInput = (value) => {
    const currencyEntered = parseInt(value)
    if (currencyEntered) {
      this.setState({
        inputedValue: currencyEntered
      })
      return
    }
    this.setState({
      inputedValue: 0
    })
  }

  // back-end code
  async componentDidMount() {
    const base = this.state.baseCurrency
    this._fetchCurrencies(base)
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
    console.log(this.state.data)
  }
  requestUpdate = (User, Company) => {
    firebase
      .database()
      .ref(`/infos/${User}/businessInfo`)
      .once("value")
      .then(sanpshot => {
        console.log(sanpshot.val().email)
        Alert.alert('Update!', `Do you want to request for update ${this.state.baseCurrency}?`, [{
          text: 'Yes',
          onPress: () => this.Updated(sanpshot.val().email, Company)
        }]);
      })
      .catch(error => {
        console.log(error.message);
      });

  };
  Updated = (femail, fcompany) => {
    const body = {
      "personalizations": [
        {
          "to": [
            {
              "email": femail
            }
          ],
          "subject": "Request New Update"
        }
      ],
      "from": {
        "name": '4xChange',
        "email": "4xchange@limitless.rw"
      },
      "content": [
        {
          "type": "text/html",
          "value": `<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
          <div style="background-color: ${Colors.primary};padding-top:20px;padding-bottom:30px;">
             <h1 style="font-size: 24px;color: #fff;text-align: center;font-family: Arial, Helvetica, sans-serif;">4xChange</h1>
             <div style="width: 90%;margin-left: auto;margin-right: auto;padding: 10px;background-color: #fff;">
            <p style="font-size: 16px;font-family:Arial, Helvetica, sans-serif;">Hello <b>${fcompany},</b><br/><br/>Your customer just need updates for ${this.state.baseCurrency} available in ${fcompany}<br/> 
            <i>CLICK <a href='https://expo.io/@nccharles/4xChange' >HERE TO UPDATE ${this.state.baseCurrency}</a></i><br/><br/>
            
            <strong>4xchange Team!</strong>
            </p>
          </div>
           </div>`
        }
      ]
    }
    //returning sendGridKey
    firebase
      .database()
      .ref(`/config`)
      .once("value")
      .then(sanpshot => {
        console.log(sanpshot.val().sgkey)

        fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sanpshot.val().sgkey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          this.setState({ response: `${response.status} - ${response.ok} - ${response.statusText}` });
          console.log(response);
          ToastAndroid.showWithGravity(
            "Sent!: We've sent your request to forexbureau",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        });
      })
      .catch(error => {
        console.log(error.message);
      });

  }
  _fetchCurrencies = async (base) => {
    this.setState({
      loading: true
    })
    const that = this
    await firebase.database().ref(`/currencies`)
      .orderByChild('currency')
      .equalTo(base)
      .on('value', snapshot => {
        // console.log(snapshot)
        const usersData = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          data: usersData,
          loading: false,
        })
      })
    this.changeBtnBuy()
  }
  setBaseCurrency = async (currency) => {
    const { baseCurrency } = currency
    this.setState({
      ...initailState,
      baseCurrency: baseCurrency,
    })
    const base = baseCurrency
    this._fetchCurrencies(base)
  }
  _clearChoiceCache = async () => {
    try {
      await AsyncStorage.setItem(userChoice, '').then(() => {
        this.props.navigation.navigate('WelcomeScreen')
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Error: faild to peform action',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }
  // end of codes

  keyExtractor = (item, index) => item.uid

  oneScreensWorth = 20

  render() {
    const { inputedValue } = this.state
    if (this.state.loading) {
      return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10, }}>
          <InputButton
            text='Enter Amount ...'
            onPress={() => this.props.navigation.navigate('CurrencyList', { setBaseCurrency: this.setBaseCurrency })}
            buttonText={this.state.baseCurrency + '   '}
            editable={true}
            keyboardType="numeric"
            onChangeText={(value) => this._handleCurrencyInput(value)}
          />

          <CategoryBtn
            onPressBuy={this.changeBtnBuy}
            onPressSell={this.changeBtnSell}
            btnBuyStyle={{
              flex: 1,
              backgroundColor: this.state.buyBackgroundColor,
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              borderRadius: 2,
            }}
            buyTextStyle={{
              color: this.state.buyTextColor,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
            btnSellStyle={{
              flex: 1,
              backgroundColor: this.state.sellBackgroundColor,
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              borderRadius: 2,
            }}
            sellTextStyle={{
              color: this.state.sellTextColor,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center'
            }} />
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => (
            <Card
              onPress1={() => this.props.navigation.navigate('Details', { userPhone: item.userPhone })}
              onPress={() => this.requestUpdate(item.userPhone, item.companyName)}
              text={item.companyName + '   '}
              text2={parseInt(item.bidPrice) + '   '}
              bidPrice={item.bidPrice + '   '}
              askPrice={item.askPrice + '   '}
              baseCurrency={item.currency + '   '}
              time={Moment(item.updatedAt).fromNow() + '   '}
              currency={this.state.initialCurrency + '   '}
              equivalent={this.state.isBuying ? parseInt(item.bidPrice) * parseInt(inputedValue) : parseInt(inputedValue) / parseInt(item.askPrice)}
              category={this.state.category + '   '}
              // source={this.state.flag}
              iconStyle={this.state.fav_icon ? 'red' : 'grey'}
              onPressIcon={() => this.handle_fav({ index, item })}
            />
          )}
          numColumns={1}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        // ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  handle_fav = ({ item, index }) => {
    let { data } = this.state;
    let targetbureau = data[index];

    targetbureau.fav_icon = !targetbureau.fav_icon;
    data[index] = targetbureau
    this.setState({
      data,
      fav_icon: data[index]
    });
  }
}

Local.propType = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    allInfoBureauses: PropTypes.object,
  }).isRequired,
}


export default Local
// export default Listcreen
