import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { 
  StyleSheet, Text, View, Button, TouchableHighlight, AsyncStorage,
  FlatList, Image, Animated,   Modal, ActivityIndicator, Dimensions,
  TouchableOpacity, ToastAndroid } from 'react-native';
import {Header} from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import Moment from 'moment'

import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import styles from './Style/ListStyle'

import CategoryBtn from '../../Components/Buttons/BtnCategory'
import Card from '../../Components/Card/Card'
import InputButton from '../../Components/InputButton/InputButton'
import HeaderBtn from '../../Components/Buttons/HeaderBtn'
import {userChoice} from '../../Config/constants'
//firebase things
import * as firebase from 'firebase'
import _ from 'lodash'


const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

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
}

class Local extends Component {

  static navigationOptions = ({navigation})=>{
    const {params} = navigation.state
    return{
        headerTitle: '4xChange',
        headerLeft: null,
        headerRight: (
          <HeaderBtn 
            onPress={() =>params.handleThis()}
            source={logout}/>
        ),
        headerStyle: {
            backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
  };


  constructor(props) {
    super(props);
    this.state = initailState
  };

  changeBtnBuy=()=>{
    this.setState({
      // buyBackgroundColor: '#3498DB',
      buyBackgroundColor: Colors.dark,
      sellBackgroundColor: 'transparent',
      category: 'Buy',
      buyTextColor: 'white',
      sellTextColor: Colors.dark,
      initialCurrency: 'RWF',
      isBuying: true
    })
  }

  changeBtnSell=()=>{
    this.setState({
      sellBackgroundColor: Colors.dark,
      buyBackgroundColor: 'transparent',
      category: 'Sell',
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

// back-end code written by Luc Dev
  async componentDidMount() {
    const base = this.state.baseCurrency
    this._fetchCurrencies(base)
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
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
        //console.log(snapshot)
        const usersData = _.map( snapshot.val(), (val, uid) =>{
          return {...val, uid}
        })
        console.log(usersData)
        that.setState({
          data: usersData,
          loading: false,
        })
      }) 
    this.changeBtnBuy()
  }
  setBaseCurrency = async (currency) => {
    const {baseCurrency} = currency
    this.setState({
      ...initailState,
      baseCurrency: baseCurrency,
    })
    const base = baseCurrency
    this._fetchCurrencies(base)
  }
  _clearChoiceCache = async () =>{
    try {
      await AsyncStorage.setItem(userChoice, '').then(() =>{
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
// end of Luc Dev codes

  keyExtractor = (item, index) => item.uid

  oneScreensWorth = 20

  render() {
    const {inputedValue} = this.state
    if(this.state.loading){
      return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <View style={{marginTop: 20,}}>
        <InputButton
              text='Enter Amount ...'
              onPress={() => this.props.navigation.navigate('CurrencyList', {setBaseCurrency: this.setBaseCurrency})}
              buttonText={this.state.baseCurrency}
              editable= {true}
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
                  borderRadius: 2,}}
                buyTextStyle={{
                  color: this.state.buyTextColor,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center'}}
                  btnSellStyle={{
                    flex: 1,
                    backgroundColor: this.state.sellBackgroundColor,
                    alignSelf: 'center',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    borderRadius: 2,}}
                  sellTextStyle={{
                    color: this.state.sellTextColor,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center'}}/>
          </View>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => (
              <Card
                onPress={() => this.props.navigation.navigate('Details',{companyId:  item.userId})}
                text={item.companyName}
                text2={parseInt(item.bidPrice)}
                bidPrice={item.bidPrice}
                askPrice={item.askPrice}
                baseCurrency={item.currency}
                time={Moment(item.updatedAt).fromNow()}
                currency= {this.state.initialCurrency}
                equivalent={this.state.isBuying ?  parseInt(item.bidPrice) * parseInt(inputedValue) : parseInt(inputedValue) / parseInt(item.askPrice)}
                category={this.state.category}
                
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
}

Local.propType={
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    allInfoBureauses: PropTypes.object,
  }).isRequired,
  }


export default Local
// export default Listcreen
