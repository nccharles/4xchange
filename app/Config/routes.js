import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

import TabNavScreen from "./tabNav";
import WelcomeScreen from "../Screens/Welcome/Welcome";

import Local from "../Screens/UserApp/Local";
import CurrencyList from "../Screens/UserApp/CurrencyList";
import Details from "../Screens/UserApp/Details";
import MapView from "../Screens/UserApp/Map";
import International from "../Screens/UserApp/International";
import Loged from "../Screens/BureauApp/Jauth";
import Signup from "../Screens/BureauApp/Signup";
import Info from "../Screens/BureauApp/Info";
import Agreement from "../Screens/BureauApp/agreement";
import AddCurrency from "../Screens/BureauApp/AddCurrency";
import InfoReg from "../Screens/BureauApp/infoRegis";
import AdditionalInfo from "../Screens/BureauApp/additionalInfo";
import Country from "../Screens/BureauApp/countryList";
// import Intro from '../Screens/Intro'

// Manifest of possible screens
const InfoRegis = StackNavigator({
  InfoReg: {
    screen: InfoReg,
    navigationOptions: {
      header: () => null
    }
  },
  Country: {
    screen: Country
  }
});
const Login = StackNavigator({
  Loged: {
    screen: Loged,
  },
  Agreement: { screen: Agreement },
  InfoRegis: {
    screen: InfoRegis
  },
  AdditionalInfo: {
    screen: AdditionalInfo
  },
});
// const RegistrationNavigator = SwitchNavigator({
//   Signup: { screen: Signup },
//   InfoRegis: { screen: InfoRegis },
//   AdditionalInfo: { screen: AdditionalInfo },
//   Country: { screen: Country }
// });
const WelcomeStack = StackNavigator({
  // InfoRegis: {screen:InfoRegis},
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
  }
});
const UserStack = StackNavigator({
  TabNavScreen: {
    screen: TabNavScreen
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
const SignedIn = StackNavigator({
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
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },

      WelcomeStack: {
        screen: WelcomeStack
      },
      UserStack: {
        screen: UserStack,
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
