import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  ActivityIndicator,
  Dimensions,
  SectionList,
  Modal,
  TextInput,
  YellowBox,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import user from '../../Assets/Icons/user.png'
import add from '../../Assets/Icons/add-list.png'

import AddBtn from '../../Components/Buttons/AddCurrencyBtn'
import ModalComponent from '../../Components/AddCurrencyModal/modal'
// import CategoryBtn from '../../Components/ButtonCategory/BtnCategory'
import Card from '../../Components/Card/BureauCard/Card'
import InputButton from '../../Components/InputButton/InputButton'
import DialogComponent from '../../Components/Dialog/Dialog'
import Header from '../../Components/Header/Header'
import RoundButton from '../../Components/Buttons/RoundButton'

import styles from './Style/AddCurrencyStyle'

//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName } from '../../Config/constants';
// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.log = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.log(message);
//   }
// };
//back end done
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

const initailState = {
  loading: true,
  inputedValue: 0,
  baseCurrency: 'Choose',
  initialCurrency: null,
  category: 'Buy or Sell',
  isBuying: true,
  DeleteDialogVisible: false,
  UpdateModal: false,
  AddModal: false,
  currentItem: {
    askPrice: null,
    bidPrice: null,
    Currency: null,
    uid: null,
  },
  error: null,
  isSubmitting: false,
}

class AddCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initailState,
      data: null,
      isLoading: true,
      userPhone: null,
      companyName: null,
      newCurrency: {
        currency: null,
        askPrice: null,
        bidPrice: null,
      }
    }
  };

  async componentWillMount() {
    const base = this.state.baseCurrency
    const currentUser = await AsyncStorage.getItem(userPhone)
    console.log(currentUser)
    this.setState({
      // companyName: currentUser.infos.businessInfo.displayName,
      companyName: await AsyncStorage.getItem(cName),
      userPhone: currentUser
    })
    this._getUserCurrencies()
  }

  //backend start
  _getUserCurrencies = async () => {
    const { userPhone } = this.state
    const that = this

    firebase.database().ref(`/currencies`)
      .orderByChild(`userPhone`)
      .equalTo(userPhone)
      .on('value', snapshot => {
        const currencies = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid }
        })
        that.setState({
          data: currencies,
          isLoading: false,
        })
      })
  }
  _handleSaveCurrency = async () => {
    console.log('done')
    const { newCurrency: { currency, askPrice, bidPrice }, userPhone, companyName, isSubmitting } = this.state
    if (_.find(this.state.data, { currency: currency })) {
      ToastAndroid.showWithGravityAndOffset(
        `${currency} already exist!!!`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      this.setState(state => ({
        ...initailState,
        newCurrency: {
          askPrice: '',
          bidPrice: '',
          currency: '',
        },
      }))

      return
    }
    if (isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true
    })
    //console.log(baseCurrency, inputedValue, userPhone)
    if (!userPhone) {
      return
    }
    if (!currency || !askPrice || !bidPrice) {
      this.setState({
        error: 'complete required field',
        isSubmitting: false,
      })
      return
    }
    const updatedAt = new Date()
    const that = this
    await firebase.database().ref(`/currencies`)
      .push({
        currency,
        askPrice,
        bidPrice,
        updatedAt,
        companyName,
        userPhone,
      })

      .then(response => {
        that.setState(state => ({
          ...initailState,
          newCurrency: {
            askPrice: '',
            bidPrice: '',
            currency: '',
          },
        }))
        ToastAndroid.showWithGravityAndOffset(
          'Currency added!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .catch(err => {
        console.log(`error: ${err}`)
      })
  }
  _handleUpdateCurrency = async () => {
    const { currentItem: { askPrice, bidPrice, uid }, userPhone, isSubmitting, companyName } = this.state
    const that = this
    if (isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true
    })
    const updatedAt = new Date()
    await firebase.database().ref(`/currencies/${uid}`)
      .update({
        askPrice,
        bidPrice,
        updatedAt,
        companyName,
      })
      .then(response => {
        that.setState({
          ...initailState,
        })
        ToastAndroid.showWithGravityAndOffset(
          'Currency updated!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  _handleSignOut = async () => {
    try {
      await AsyncStorage.setItem(userPhone, '').then(() => {
        this.props.navigation.navigate('WelcomeScreen')
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }
  //backend ends

  Show_Custom_Alert = () => {
    this.setState({ AddModal: true });
  }

  showDeleteDialog = (item) => {
    this.setState({
      DeleteDialogVisible: true,
      currentItem: {
        askPrice: item.askPrice,
        bidPrice: item.bidPrice,
        uid: item.uid,
        currency: item.currency
      }
    });
  };
  showUpdateDialog = (item) => {
    this.setState({
      UpdateModal: true,
      currentItem: {
        askPrice: item.askPrice,
        bidPrice: item.bidPrice,
        uid: item.uid,
        currency: item.currency

      }
    });
  };

  handleCancel = () => {
    this.setState({
      ...initailState
    });
  };

  handleDelete = () => {
    const { userPhone, currentItem, isSubmitting } = this.state
    const that = this
    if (isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true
    })
    firebase.database().ref(`currencies/${currentItem.uid}`)
      .set(null)
      .then(response => {
        ToastAndroid.showWithGravityAndOffset(
          'Currency deleted!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .catch(err => {
        console.log(err)
      })
    that.setState({ ...initailState })
  };
  handleUpdate = () => {
    console.log('updated')
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

  _handleNewCurrencyTextInput = (key, value) => {
    this.setState(state => ({
      newCurrency: {
        ...state.newCurrency,
        [key]: value,
      }
    }))
  }
  _handleUpdateCurrencyTextInput = (key, value) => {
    this.setState(state => ({
      currentItem: {
        ...state.currentItem,
        [key]: value,
      }
    }))
  }



  setBaseCurrency = async (currency) => {
    const { baseCurrency } = currency
    this.setState(state => ({
      baseCurrency: baseCurrency,
      AddModal: true,
      newCurrency: {
        ...state.newCurrency,
        currency: baseCurrency,
      }
    }))

  }
  getCurrency = async (setBaseCurrency) => {
    this.setState({
      ...initailState,
    })
    this.props.navigation.navigate('CurrencyList', { setBaseCurrency: this.setBaseCurrency })
  }

  keyExtractor = (item, index) => index.toString()

  oneScreensWorth = 30
  openModal = () => {
    alert('ok')
  }

  render() {
    const { inputedValue, isLoading, error } = this.state
    return (
      <View style={styles.container}>
        <Header
          source1={user}
          source2={logout}
          onPress1={() => this.props.navigation.navigate('Info')}
          onPress2={this._handleSignOut.bind(this)} />
        <AddBtn
          onPress={this.Show_Custom_Alert.bind(this)} />
        {isLoading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View> :
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Card
                onPress={() => this.showUpdateDialog(item)}
                onPressDel={() => this.showDeleteDialog(item)}
                text={item.currency + '   '}
                askPrice={item.askPrice + '   '}
                bidPrice={item.bidPrice + '   '}
                time={Moment(item.updatedAt).fromNow() + '   '} />
            )}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
          />}
        <ModalComponent
          visible={this.state.AddModal}
          onRequestClose={() => this.Show_Custom_Alert(!this.state.Alert_Visibility)}
          onPressCurrency={() => this.getCurrency(this.state.baseCurrency)}
          baseCurrencyBtnTxt={this.state.baseCurrency + '   '}
          onChangeTextBuy={(value) => this._handleNewCurrencyTextInput('askPrice', value)}
          onChangeTextSell={(value) => this._handleNewCurrencyTextInput('bidPrice', value)}
          onPressCancel={this.handleCancel}
          onPressAction={this._handleSaveCurrency.bind(this)}
          actionBtnTxt="Save   "
          valueBuy={this.state.newCurrency.askPrice}
          valueSell={this.state.newCurrency.bidPrice}
          icon="download"
        />
        <ModalComponent
          visible={this.state.UpdateModal}
          onRequestClose={() => this.Show_Custom_Alert(!this.state.Alert_Visibility)}
          baseCurrencyBtnTxt={this.state.currentItem.currency + '   '}
          onChangeTextBuy={(value) => this._handleUpdateCurrencyTextInput('askPrice', value)}
          onChangeTextSell={(value) => this._handleUpdateCurrencyTextInput('bidPrice', value)}
          onPressCancel={this.handleCancel}
          onPressAction={this._handleUpdateCurrency.bind(this)}
          valueBuy={this.state.currentItem.askPrice}
          valueSell={this.state.currentItem.bidPrice}
          actionBtnTxt="Update   "
          icon="refresh-ccw"
        />
        <DialogComponent
          visible={this.state.DeleteDialogVisible}
          title="Account delete"
          description="Are you sure you want to delete this currency?"
          // input="892"
          onPress={this.handleDelete}
          onPressCancel={this.handleCancel}
          label2="Delete   "
        />
      </View>
    );
  }
}

export default AddCurrency