import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import user from '../../Assets/Icons/user.png'
import AddBtn from '../../Components/Buttons/AddCurrencyBtn'
import ModalComponent from '../../Components/AddCurrencyModal/modal'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import Card from '../../Components/Card/BureauCard/Card'
import DialogComponent from '../../Components/Dialog/Dialog'
import Header from '../../Components/Header/Header'
import ChatBtn from '../../Components/Buttons/BtnChat'
import styles from './Style/AddCurrencyStyle'

//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName, chatNum, chatName } from '../../Config/constants';
import { registerForPushNotificationsAsync } from '../../Config/notice';
import ManageCurrency from '../../Components/Customs/ManageCurency';
import Details from '../UserApp/profile';

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
      customerMessage: 0,
      newCurrency: {
        currency: null,
        askPrice: null,
        bidPrice: null,
      }
    }
  };


  Show_Custom_Alert = () => {
    this.setState({ AddModal: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPress1={() => this.props.navigation.goBack()}
          forex="Manage Forex"
          Add={this.Show_Custom_Alert.bind(this)}
          Update={() => this.props.navigation.navigate('Info')}
        />
        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor={Colors.primary}
          tabBarActiveTextColor="#fff"
          tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
          tabBarInactiveTextColor={Colors.lightGray}
        >
          <ManageCurrency tabLabel="Currency" {...this.props} />
          <Details tabLabel="Profile" {...this.props} />
        </ScrollableTabView>

      </View>
    );
  }
}

export default AddCurrency