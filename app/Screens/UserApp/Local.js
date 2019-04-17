import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View, AsyncStorage,
  FlatList, ActivityIndicator, Alert, NetInfo
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import styles from './Style/ListStyle'

import CategoryBtn from '../../Components/Buttons/BtnCategory'
import Card from '../../Components/Card/Card'
import InputButton from '../../Components/InputButton/InputButton'
import HeaderBtn from '../../Components/Buttons/HeaderBtn'
import { userChoice, LocalData } from '../../Config/constants'
//firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { sendPushNotification } from '../../Config/notice';
const initailState = {
  data: [],
  loading: true,
  inputedValue: 0,
  baseCurrency: 'USD',
  initialCurrency: null,
  buyBackgroundColor: 'transparent',
  buyTextColor: Colors.primaryDark,
  sellBackgroundColor: 'transparent',
  sellTextColor: Colors.primaryDark,
  ConnectionStatus: false,
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
      buyBackgroundColor: Colors.primaryDark,
      sellBackgroundColor: 'transparent',
      category: 'Buy   ',
      buyTextColor: 'white',
      sellTextColor: Colors.primaryDark,
      initialCurrency: 'RWF',
      isBuying: true
    })
  }

  changeBtnSell = () => {
    this.setState({
      sellBackgroundColor: Colors.primaryDark,
      buyBackgroundColor: 'transparent',
      category: 'Sell   ',
      sellTextColor: 'white',
      buyTextColor: Colors.primaryDark,
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
    this.NetworkStatus()
    const status = this.state.ConnectionStatus
    if (status === 'offline') {
      const loadLocaldata = await AsyncStorage.getItem(LocalData)
      this.setState({
        data: loadLocaldata,
        loading: false,
      })
    }

    const base = this.state.baseCurrency
    this._fetchCurrencies(base)
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
    console.log(this.state.data)
  }
  NetworkStatus = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      this.setState({
        ConnectionStatus: isConnected
      })
    });
    function handleFirstConnectivityChange(isConnected) {
      console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  requestUpdate = (User, Company) => {
    firebase
      .database()
      .ref(`/infos/${User}/businessInfo`)
      .once("value")
      .then(sanpshot => {
        Alert.alert('Update!', `Do you want to request for update ${this.state.baseCurrency}?`, [{
          text: 'Yes',
          onPress: () => this.Updated(User, sanpshot.val().email, Company)
        }]);
      })
      .catch(error => {
        console.log(error.message);
      });

  };
  Updated = (companyPhone, femail, fcompany) => {
    //returning sendGridKey
    firebase
      .database()
      .ref(`/config`)
      .once("value")
      .then(sanpshot => {
        sendPushNotification('Customer', companyPhone, sanpshot.val().content)
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
              "value": `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
          <html xmlns='http://www.w3.org/1999/xhtml' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
          <head style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
              <meta http-equiv='Content-Type' content='text/html; charset=utf-8' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
              <meta name='viewport' content='width=device-width' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
              <style type='text/css' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
              * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; }
          
          img { max-width: 100%; margin: 0 auto; display: block; }
          
          body, .body-wrap { padding: 40px;width: 100% !important; height: 100%; background: linear-gradient(180deg,${Colors.primary},${Colors.secondary},#fff,#fff); }
          
          a { color: ${Colors.primary} ; text-decoration: none; }
          
          a:hover { text-decoration: underline; }
          
          .text-center { text-align: center; }
          
          .text-right { text-align: right; }
          
          .text-left { text-align: left; }
          
          .button { display: inline-block; color: white; background: ${Colors.secondary}; border: solid ${Colors.secondary}; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }
          
          .button:hover { text-decoration: none; }
          
          h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }
          
          h1 { font-size: 32px; }
          
          h2 { font-size: 28px; }
          
          h3 { font-size: 24px; }
          
          h4 { font-size: 20px; }
          
          h5 { font-size: 16px; }
          
          p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }
          
          .container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 580px !important; }
          
          .container table { width: 100% !important; border-collapse: collapse; }
          
          .container .masthead { padding: 80px 0; background: ${Colors.secondary}; color: ${Colors.primary}; }
          
          .container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }
          
          .container .content { background: white; padding: 30px 35px; }
          
          .container .content.footer { background: none; }
          
          .container .content.footer p { margin-bottom: 0; color: #000; text-align: center; font-size: 14px; }
          
          .container .content.footer a { color: ${Colors.primary}; text-decoration: none; font-weight: bold; }
          
          .container .content.footer a:hover { text-decoration: underline; }
              </style>
          </head>
          <body style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;height: 100%;background: #f8f8f8;width: 100% !important;'>
          <table class='body-wrap' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;height: 100%;background: #f8f8f8;width: 100% !important;'>
              <tr style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                  <td class='container' style='margin: 0 2px !important;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;display: block !important;clear: both !important;max-width: 580px !important;'>
          
                      <!-- Message start -->
                      <table style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;border-collapse: collapse;width: 100% !important;'>
                          
                          <tr style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                              <td class='content' style='margin: 0;padding: 30px 35px;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;background: white;'>
          
                                  <h2 style='margin: 0;padding: 0;font-size: 28px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.25;margin-bottom: 20px;'>Hello ${fcompany},</h2>
                                  <p style='margin: 0;padding: 0;font-size: 16px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 20px;'>${sanpshot.val().content}</p>
                                  <table style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;border-collapse: collapse;width: 100% !important;'>
                                      <tr style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                                          <td align='center' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                                              <p style='margin: 0;padding: 0;font-size: 16px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 20px;'>
                                                  <a href='${sanpshot.val().link}' class='button' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: ${Colors.primary};text-decoration: none;display: inline-block;background: ${Colors.secondary};border: solid ${Colors.secondary};border-width: 10px 20px 8px;font-weight: bold;border-radius: 4px;'>Click to update ${this.state.baseCurrency}</a>
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
          
                                  <p style='margin: 0;padding: 0;font-size: 16px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 20px;'><em style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>Regards,<br/><strong>Limitless Apps</strong></em></p>
          
                              </td>
                          </tr>
                      </table>
          
                  </td>
              </tr>
              <tr style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                  <td class='container' style='margin: 0 auto !important;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;display: block !important;clear: both !important;max-width: 580px !important;'>
          
                      <!-- Message start -->
                      <table style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;border-collapse: collapse;width: 100% !important;'>
                          <tr style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;'>
                              <td class='content footer' align='center' style='margin: 0;padding: 30px 35px;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;background: none;'>
                                  <p style='margin: 0;padding: 0;font-size: 14px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 0;color: #000;text-align: center;'>Proudly powered by <a href='http://limitless.rw/limitless_apps/' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: #333;text-decoration: none;font-weight: bold;'>Limitless apps</a></p>
                                  <p style='margin: 0;padding: 0;font-size: 14px;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 0;color: #000;text-align: center;'><a href='mailto:' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: #333;text-decoration: none;font-weight: bold;'>4xchange@limitless.rw</a> | <a href='http://limitless.rw/limitless_apps/' style='margin: 0;padding: 0;font-size: 100%;font-family: 'Avenir Next', &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: #333;text-decoration: none;font-weight: bold;'>Unsubscribe</a></p>
                              </td>
                          </tr>
                      </table>
          
                  </td>
              </tr>
          </table>
          </body>
          </html>
           `
            }
          ]
        }

        fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sanpshot.val().sgkey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          this.setState({ response: `${response.status} - ${response.ok} - ${response.statusText}` });
          this.refs.toast.show("Sent!: We've sent your request to forexbureau");
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
        const usersData = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          data: usersData,
          loading: false,
        })

      })
    this.changeBtnBuy()
    await AsyncStorage.setItem(LocalData, JSON.stringify(this.state.data))
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
      this.refs.toast.show("Error: faild to peform action");
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
              fontSize: 12,
              fontWeight: '300',
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
              fontSize: 12,
              fontWeight: '300',
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
