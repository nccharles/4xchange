import React from 'react';
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import TabNavScreen from "./tabNav";
import WelcomeScreen from "../Screens/Welcome/Welcome";
import Settingscreen from '../Screens/UserApp/Settings'
import Local from "../Screens/UserApp/Local";
import CurrencyList from "../Screens/UserApp/CurrencyList";
import Details from "../Screens/UserApp/Details";
import MapView from "../Screens/UserApp/Map";
import International from "../Screens/UserApp/International";
import Loged from "../Screens/BureauApp/Login";
import userNumber from '../Screens/UserApp/usernumber'
import Info from "../Screens/BureauApp/Info";
import Agreement from "../Screens/BureauApp/agreement";
import AddCurrency from "../Screens/BureauApp/AddCurrency";
import InfoReg from "../Screens/BureauApp/infoRegis";
import AdditionalInfo from "../Screens/BureauApp/additionalInfo";
import Country from "../Screens/BureauApp/countryList";
import Chat from '../Screens/UserApp/Chat';
import Chatlist from '../Screens/BureauApp/Chatlist'
import ForexChat from '../Screens/BureauApp/fchat';
import { Colors } from '../Assets/Themes';
// Manifest of possible screens
const Intro = createSwitchNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: () => null
    }
  },
  TabNavScreen: {
    screen: TabNavScreen,
    navigationOptions: {
      header: () => null
    }
  },
})
const userNumberInfo = createSwitchNavigator({
  userNumber: {
    screen: userNumber
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      header: () => null
    }
  },

})
const InfoRegis = createStackNavigator({
  InfoReg: {
    screen: InfoReg,
  },
  Country: {
    screen: Country
  }
});
const Register = createStackNavigator({
  Agreement: { screen: Agreement },
  InfoRegis: {
    screen: InfoRegis,
    navigationOptions: {
      header: () => null
    }
  },
  Country: { screen: Country },
  Chatlist: {
    screen: Chatlist,
  },
  ForexChat: {
    screen: ForexChat,
    navigationOptions: {
      header: () => null
    }
  },
  AdditionalInfo: {
    screen: AdditionalInfo
  },

});
const SignedIn = createStackNavigator({
  AddCurrency: {
    screen: AddCurrency,
    navigationOptions: {
      header: () => null
    }
  },
  Chatlist: {
    screen: Chatlist,
  },
  ForexChat: {
    screen: ForexChat,
    navigationOptions: {
      header: () => null
    }
  },
  Info: { screen: Info }
});
const WelcomeStack = createStackNavigator({
  TabNavScreen: {
    screen: TabNavScreen,
    navigationOptions: {
      header: () => null
    }
  },
  AddCurrency: {
    screen: AddCurrency,
    navigationOptions: {
      header: () => null
    }
  },
  Chatlist: {
    screen: Chatlist,
  },
  ForexChat: {
    screen: ForexChat,
    navigationOptions: {
      header: () => null
    }
  },
  Info: { screen: Info },
  Settings: {
    screen: Settingscreen
  },
  Country: { screen: Country },
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
  Chat: {
    screen: Chat,
    navigationOptions: {
      header: () => null
    }
  },
  userNumber: {
    screen: userNumberInfo,
    navigationOptions: {
      header: () => null
    }
  },
  Login: {
    screen: Loged,
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: () => null
    }
  },
  SignedIn: {
    screen: SignedIn,
    navigationOptions: {
      header: () => null
    }
  },
});

export default (PrimaryNav = (initialRouter = "WelcomeStack") => {
  return createSwitchNavigator(
    {
      Intro: {
        screen: Intro
      },
      SignedIn: {
        screen: SignedIn
      },

      WelcomeStack: {
        screen: WelcomeStack,
      },
      AdditionalInfo: {
        screen: AdditionalInfo
      },
      InfoRegis: {
        screen: InfoRegis
      },

    },
    {
      initialRouteName: `${initialRouter}`,
      headerMode: "float",
      mode: "modal"
    }
  );
});
