import React from 'react';
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import TabNavScreen from "./tabNav";
import WelcomeScreen from "../Screens/Welcome/Welcome";
import HeaderBtn from '../Components/Buttons/HeaderBtn'
// import logout from '../Assets/Icons/logout.png'
// import { userChoice } from './constants';
import Local from "../Screens/UserApp/Local";
import CurrencyList from "../Screens/UserApp/CurrencyList";
import Details from "../Screens/UserApp/Details";
import MapView from "../Screens/UserApp/Map";
import International from "../Screens/UserApp/International";
import Loged from "../Screens/BureauApp/Login";
import Info from "../Screens/BureauApp/Info";
import Agreement from "../Screens/BureauApp/agreement";
import AddCurrency from "../Screens/BureauApp/AddCurrency";
import InfoReg from "../Screens/BureauApp/infoRegis";
import AdditionalInfo from "../Screens/BureauApp/additionalInfo";
import Country from "../Screens/BureauApp/countryList";
import { Colors } from '../Assets/Themes';


// Manifest of possible screens
const InfoRegis = createStackNavigator({
  InfoReg: {
    screen: InfoReg,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: "#fff"
    }
  },
  Country: {
    screen: Country
  }
});
const Login = createStackNavigator({
  Loged: {
    screen: Loged,
  },
  Agreement: { screen: Agreement },
  InfoRegis: {
    screen: InfoRegis,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: "#fff"
    }
  },
  AdditionalInfo: {
    screen: AdditionalInfo
  },
});
const WelcomeStack = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: () => null
    }
  },
  Login: {
    screen: Loged,
  },
  Country: { screen: Country },
  TabNavScreen: {
    screen: TabNavScreen,
    navigationOptions: () => {
      let Title = '4xChange   '
      return {
        headerTitle: Title + '   ',
        headerLeft: null,
        headerRight: (
          <HeaderBtn />
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
    }
  },
  Local: { screen: Local },
  MapView: { screen: MapView },
  International: { screen: International },
  CurrencyList: { screen: CurrencyList },
  Details: {
    screen: Details,
    navigationOptions: {
      header: () => null
    }
  }
});
const UserStack = createStackNavigator({
  TabNavScreen: {
    screen: TabNavScreen,
    navigationOptions: () => {
      let Title = '4xChange   '
      return {
        headerTitle: Title + '   ',
        headerLeft: null,
        headerRight: (
          <HeaderBtn />
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
    }
  },
  Local: { screen: Local },
  CurrencyList: { screen: CurrencyList },
  MapView: { screen: MapView },
  International: { screen: International },
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
  }
});
const SignedIn = createStackNavigator({
  AddCurrency: {
    screen: AddCurrency,
    navigationOptions: {
      header: () => null
    }
  },
  CurrencyList: { screen: CurrencyList },
  Info: { screen: Info }
});

export default (PrimaryNav = (initialRouter = "WelcomeStack") => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },

      WelcomeStack: {
        screen: WelcomeStack,
      },
      UserStack: {
        screen: UserStack
      },
      Login: {
        screen: Login
      },
      AdditionalInfo: {
        screen: AdditionalInfo
      },
      InfoRegis: {
        screen: InfoRegis
      },
      Details: {
        screen: Details,
        navigationOptions: {
          header: () => null
        }
      },
    },
    {
      initialRouteName: `${initialRouter}`,
      headerMode: "float",
      mode: "modal"
    }
  );
});
