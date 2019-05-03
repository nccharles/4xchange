import React from 'react'
import { View, Dimensions, StyleSheet, TouchableOpacity, NetInfo, Text, AsyncStorage } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Colors } from '../Assets/Themes'
import MapView from '../Screens/UserApp/Map'
import International from '../Screens/UserApp/International'
import Local from '../Screens/UserApp/Local'
import { Icon } from 'expo';
import Toast from 'react-native-easy-toast'
import Chats from '../Screens/UserApp/Chatlist'
import BureauChats from '../Screens/BureauApp/Chatlist'
import more from '../Assets/Icons/more.png'
import OptionsMenu from "react-native-options-menu";
import { userPhone, cName } from './constants';
import * as firebase from 'firebase'
const screenWidth = Dimensions.get('window').width
export default class TabNavigationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhone: ''
    };
  }
  Settings = () => {
    this.props.navigation.navigate('Settings')
    // console.log('Settings')
  }
  _handleForex = async () => {
    this.NetworkStatus()
    const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
    if (retrieveduserPhone) {
      try {
        await firebase.database().ref(`infos/${retrieveduserPhone}/publicInfo`).once("value")
          .then(async (snapshot) => {
            const { completed } = snapshot.val()
            const forexName = snapshot.val().companyName
            if (completed) {
              await AsyncStorage.setItem(cName, forexName).then(
                () => this.props.navigation.navigate('AddCurrency')
              )


            } else {

              this.props.navigation.navigate('InfoRegis')
            }
          }).catch(error => {
            this.refs.toast.show(error.message)
            this.props.navigation.navigate('InfoRegis')
          })
      } catch (error) {
        this.refs.toast.show(error.message)
      }
    } else {
      this.props.navigation.navigate('Login')
    }

  }
  componentDidMount = async () => {
    const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
    this.setState({
      userPhone: retrieveduserPhone
    })
    this.NetworkStatus()
  }
  checkUser = async () => {
    const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
    this.setState({
      userPhone: retrieveduserPhone
    })
  }
  NetworkStatus = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      !isConnected && this.refs.toast.show('No Internet')
    });
    function handleFirstConnectivityChange(isConnected) {
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
  render() {
    return <View style={{ flex: 1 }}>

      <View style={styles.topBit}>
        <Text style={styles.logo}>4xChange</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={this._handleForex.bind(this)} >
            <Icon.Entypo name="add-to-list" color={Colors.primaryWhite} size={23} style={{ padding: 20 }} />
          </TouchableOpacity>
          <OptionsMenu
            button={more}
            buttonStyle={{ width: screenWidth / 18, height: screenWidth / 18, margin: 20, marginBottom: -1, resizeMode: "contain" }}
            destructiveIndex={1}
            options={["Settings"]}
            actions={[this.Settings]} />
        </View>
      </View>
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={Colors.primary}
        tabBarActiveTextColor={Colors.primaryWhite}
        onChangeTab={this.checkUser}
        tabBarTextStyle={styles.tabBar}
        tabBarUnderlineStyle={{ backgroundColor: Colors.primaryWhite }}
        tabBarInactiveTextColor={Colors.primaryWhite}
      >
        <Local tabLabel='Local' {...this.props} />
        <MapView tabLabel='Locate' {...this.props} />
        <International tabLabel='Global' {...this.props} />
        {this.state.userPhone ? <BureauChats tabLabel='Chats' {...this.props} /> : <Chats tabLabel='Chats' {...this.props} />}
      </ScrollableTabView>
      <Toast ref="toast"
        style={{ backgroundColor: Colors.primary }}
        position='bottom'
        positionValue={120}
        fadeInDuration={750}
        fadeOutDuration={1500}
        opacity={0.8}
        textStyle={{ color: Colors.primaryWhite }} />
    </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryWhite,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    color: Colors.primaryWhite,
    fontSize: 23,
    margin: 10,
    marginLeft: 20,
    fontFamily: 'Lucida-Grande-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabBar: {
    fontFamily: 'Lucida-Grande-Bold',
    fontSize: 15
  },
  topBit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between'
  },
});

