import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Colors } from '../../Assets/Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Header from '../../Components/Header/Header'
import styles from './Style/AddCurrencyStyle'
//backend imports 
import _ from 'lodash'
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
          onPress1={() => this.props.navigation.navigate('TabNavScreen')}
          forex="Manage Forex"
          Add={this.Show_Custom_Alert.bind(this)}
          Update={() => this.props.navigation.navigate('Info')}
        />
        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor={Colors.primary}
          tabBarActiveTextColor="#fff"
          tabBarTextStyle={{ fontFamily: 'Lucida-Grande-Bold', fontSize: 15 }}
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