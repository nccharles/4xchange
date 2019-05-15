import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View, AsyncStorage,
  FlatList, StyleSheet, Dimensions, Image, ActivityIndicator, Alert, NetInfo
} from 'react-native';
import Toast from 'react-native-easy-toast'
import Moment from 'moment'
import { Colors, Metrics } from '../../Assets/Themes'
import styles from './Style/ListStyle'
import emptydata from '../../Assets/Icons/empty.png'
import CategoryBtn from '../../Components/Buttons/BtnCategory'
import Card from '../../Components/Card/Card'
import InputButton from '../../Components/InputButton/InputButton'
import { userChoice, LocalData, Quote, Base } from '../../Config/constants'
import { currencies, flagUrl, flagBTC, flagXAG, flagXAU, flagXDR, url } from '../../Assets/resources/data';
//firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { sendPushNotification } from '../../Config/notice';
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height
const initialState = {
  data: [],
  loading: true,
  inputedValue: 1,
  initialCurrency: null,
  buyBackgroundColor: 'transparent',
  buyTextColor: Colors.primaryWhite,
  sellBackgroundColor: 'transparent',
  sellTextColor: Colors.primaryWhite,
  ConnectionStatus: false,
  category: 'Buy',
  isBuying: true,
  userData: [],
  showAlert: true,
  fav_icon: false,
  bureau: null
}

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      baseCurrency: 'USD',
      quoteCurrency: 'RWF',
    }
  };
  handleFlag = (currency) => {
    if (currency) {
      switch (currency) {
        case 'BTC':
          return flagBTC;
        case 'XDR':
          return flagXDR;
        case 'XAU':
          return flagXAU;
        case 'XAG':
          return flagXAG;
        default:
          return `${flagUrl}/${currency.substr(0, 2)}.png`;

      }
    }
  };

  changeBtnBuy = () => {
    this.setState({
      buyBackgroundColor: 'transparent',
      sellBackgroundColor: 'transparent',
      category: 'Buy',
      buyTextColor: Colors.primaryWhite,
      sellTextColor: Colors.primaryLight,
      initialCurrency: this.state.quoteCurrency,
      isBuying: true
    })
  }

  changeBtnSell = () => {
    this.setState({
      sellBackgroundColor: 'transparent',
      buyBackgroundColor: 'transparent',
      category: 'Sell',
      sellTextColor: Colors.primaryWhite,
      buyTextColor: Colors.primaryLight,
      initialCurrency: this.state.quoteCurrency,
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
      inputedValue: 1.0
    })
  }

  // back-end code
  async componentDidMount() {
    this.NetworkStatus()
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
  }
  NetworkStatus = async () => {
    const currency = await AsyncStorage.getItem(Base)
    const quote = await AsyncStorage.getItem(Quote)
    const filter = {
      currency,
      quote
    };
    NetInfo.isConnected.fetch().then(async (isConnected) => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      if (!isConnected) {
        const loadLocaldata = await AsyncStorage.getItem(LocalData)
        console.log(loadLocaldata)
        if (loadLocaldata !== null) {
          const Localdata = JSON.parse(loadLocaldata)
          const allCurrencies = Localdata.filter((currency) => {
            for (let key in filter) {
              if (currency[key] === undefined || currency[key] != filter[key])
                return false;
            }
            return true;
          });
          this.setState({
            data: allCurrencies,
            loading: false,
          })
        }
      } else {
        !currency ? await AsyncStorage.setItem(Base, this.state.baseCurrency) : this.setState({ baseCurrency: currency })
        !quote ? await AsyncStorage.setItem(Quote, this.state.quoteCurrency) : this.setState({ quoteCurrency: quote })
        this._fetchCurrencies()
      }
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
        if (sanpshot.val().email === null) {
          return this.refs.toast.show("E-mail not Provided");
        } else {
          Alert.alert('Update!', `Do you want to request for update ${this.state.baseCurrency}?`, [{
            text: 'Yes',
            onPress: () => this.Updated(User, sanpshot.val().email, Company)
          }]);
        }
      })
      .catch(error => {
        console.log(error.message);
      });

  };
  Updated = (companyPhone, femail, fcompany) => {

    firebase
      .database()
      .ref(`/config`)
      .once("value")
      .then(sanpshot => {
        sendPushNotification('Customer', companyPhone, sanpshot.val().content)
        //returning sendGridKey
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
  _fetchCurrencies = async () => {

    this.setState({
      loading: true
    })
    const currency = await AsyncStorage.getItem(Base)
    const quote = await AsyncStorage.getItem(Quote)
    const filter = {
      currency,
      quote
    };
    const that = this
    await firebase.database().ref(`/currencies`)
      .on('value', async snapshot => {
        const usersData = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        console.log(usersData)
        if (usersData !== undefined) {
          await AsyncStorage.setItem(LocalData, JSON.stringify(usersData)).then(() => {
            const allCurrencies = usersData.filter((currency) => {
              for (let key in filter) {
                if (currency[key] === undefined || currency[key] != filter[key])
                  return false;
              }
              return true;
            });
            that.setState({
              data: allCurrencies,
              loading: false,
            })
          })
        }
        that.setState({
          loading: false,
        })

      })
    this.changeBtnBuy()
  }


  setBaseCurrency = async (currency) => {

    const { baseCurrency } = currency
    this.setState(state => ({
      ...initialState,
      baseCurrency: baseCurrency
    }))
    await AsyncStorage.setItem(Base, baseCurrency).then(async () => {
      this.NetworkStatus()
    })

  }
  setQuoteCurrency = async (currency) => {
    const { quoteCurrency } = currency
    this.setState(state => ({
      ...initialState,
      quoteCurrency: quoteCurrency,
    }))
    await AsyncStorage.setItem(Quote, quoteCurrency).then(async () => {
      this.NetworkStatus()
    })
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
    const { inputedValue, loading, data } = this.state
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10, }}>
          <InputButton
            text='Enter Amount ...'
            baseFlag={{ uri: this.handleFlag(this.state.baseCurrency) }}
            quoteFlag={{ uri: this.handleFlag(this.state.quoteCurrency) }}
            onPressBase={() => this.props.navigation.navigate('CurrencyList', { setBaseCurrency: this.setBaseCurrency })}
            onPressQuote={() => this.props.navigation.navigate('CurrencyList', { setQuoteCurrency: this.setQuoteCurrency })}
            baseText={this.state.baseCurrency}
            quoteText={this.state.quoteCurrency}
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
              borderRadius: screenheight,
              marginHorizontal: 40,
            }}
            buyTextStyle={{
              color: this.state.buyTextColor,
              fontSize: screenwidth / 30,
              fontFamily: 'Lucida-Grande-Bold',
              textAlign: 'center',
              elevation: 3,

            }}
            btnSellStyle={{
              flex: 1,
              backgroundColor: this.state.sellBackgroundColor,
              alignSelf: 'center',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              borderRadius: screenheight,
              marginHorizontal: 40,

            }}
            sellTextStyle={{
              color: this.state.sellTextColor,
              fontSize: screenwidth / 30,
              fontFamily: 'Lucida-Grande-Bold',
              textAlign: 'center',
              elevation: 3,
            }} />
        </View>
        {loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View> : data.length === 0 ?
            <View style={[
              {
                backgroundColor: Colors.primaryWhite,
                justifyContent: 'center',
                alignItems: 'center',
                top: 10,
                bottom: 50
              }]}>
              <Image
                source={emptydata}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  resizeMode: 'contain'
                }}
              />
            </View>
            :
            <FlatList
              contentContainerStyle={styles.listContent}
              data={data}
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={({ item, index }) => {
                if (item.companyName) {
                  return <Card
                    onPress1={() => this.props.navigation.navigate('Details', { userPhone: item.userPhone })}
                    onPress={() => this.requestUpdate(item.userPhone, item.companyName)}
                    text={item.companyName}
                    text2={parseInt(item.bidPrice)}
                    bidPrice={item.bidPrice}
                    askPrice={item.askPrice}
                    baseCurrency={item.currency}
                    time={Moment(item.updatedAt).fromNow()}
                    currency={item.quote}
                    equivalent={this.state.isBuying ? parseInt(item.askPrice) * parseInt(inputedValue) : parseInt(inputedValue) * parseInt(item.bidPrice)}
                    category={this.state.category}
                    // source={this.state.flag}
                    iconStyle={this.state.fav_icon ? 'red' : 'grey'}
                    onPressIcon={() => this.handle_fav({ index, item })}
                  />
                }
              }}
              numColumns={1}
              initialNumToRender={this.oneScreensWorth}
              ListEmptyComponent={this.renderEmpty}
            // ItemSeparatorComponent={this.renderSeparator}
            />
        }
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
