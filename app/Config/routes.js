import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { StackNavigator, SwitchNavigator} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'

import TabNavScreen from './tabNav'
import WelcomeScreen from '../Screens/Welcome/Welcome'

import Local from '../Screens/UserApp/Local'
import CurrencyList from '../Screens/UserApp/CurrencyList'
import Details from '../Screens/UserApp/Details'
import MapView from '../Screens/UserApp/Map'
import International from '../Screens/UserApp/International'
import Login from '../Screens/BureauApp/Login'
import Signup from '../Screens/BureauApp/Signup'
import Info from '../Screens/BureauApp/Info'
import Agreement from '../Screens/BureauApp/agreement'
import AddCurrency from '../Screens/BureauApp/AddCurrency'
import InfoRegis from '../Screens/BureauApp/infoRegis'
import AdditionalInfo from '../Screens/BureauApp/additionalInfo'
// import Intro from '../Screens/Intro'


// Manifest of possible screens
const RegistrationNavigator = SwitchNavigator({
  Signup: { screen: Signup },
  InfoRegis: {screen:InfoRegis},
  AdditionalInfo: {screen: AdditionalInfo},
})
const WelcomeStack = StackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: () => null
    } 
  },
  TabNavScreen: { screen: TabNavScreen },
  Local: { screen: Local },
  MapView: { screen: MapView },
  International: { screen: International },
  CurrencyList: { screen: CurrencyList },
  Agreement: {screen: Agreement},
  Details: { 
    screen: Details,
    navigationOptions: {
      header: () => null
    }
  },
})
const UserStack = StackNavigator({
  TabNavScreen: { screen: TabNavScreen },
  Local: { screen: Local },
  MapView: { screen: MapView },
  International: { screen: International },
  CurrencyList: { screen: CurrencyList },
  Details: { 
    screen: Details,
    navigationOptions: {
      header: () => null
    }
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: () => null
    } 
  },
})
const SignedIn = StackNavigator({
  AddCurrency: { 
    screen: AddCurrency,
    navigationOptions: {
      header: () => null
    }
  },
  CurrencyList: {screen: CurrencyList},
  Info: { screen: Info },
})

export default PrimaryNav = (initialRouter ="WelcomeStack") => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      WelcomeStack: {
        screen: WelcomeStack
      },
      UserStack:{
        screen: UserStack
      },
      Signup: {
         screen: Signup 
      },
      InfoRegis: {
        screen:InfoRegis
      },
      AdditionalInfo: {
        screen: AdditionalInfo
      },
      Login: { 
        screen: Login,
      },
    },
    {
      initialRouteName: `${initialRouter}`,
      headerMode: 'float',
      mode: 'modal',
    }
  );
};