import React from 'react'
import { Image, View, Dimensions, StyleSheet, Text } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Colors } from '../Assets/Themes'
import MapView from '../Screens/UserApp/Map'
import International from '../Screens/UserApp/International'
import Local from '../Screens/UserApp/Local'
import { Icon } from 'expo';
import Chats from '../Screens/UserApp/Chatlist'
import more from '../Assets/Icons/more.png'
import OptionsMenu from "react-native-options-menu";
const screenWidth = Dimensions.get('window').width
export default class TabNavigationScreen extends React.Component {
  Settings = () => {
    this.props.navigation.navigate('Settings')
    // console.log('Settings')
  }
  render() {
    return <View style={{ flex: 1 }}>

      <View style={styles.topBit}>
        <Text style={styles.logo}>4xChange   </Text>
        <View style={styles.row}>
          <Icon.Entypo name="add-to-list" color='#fff' size={23} style={{ padding: 30 }} />
          <OptionsMenu
            button={more}
            buttonStyle={{ width: screenWidth / 17, height: screenWidth / 17, color: "#fff", margin: 30, marginBottom: -1, resizeMode: "contain" }}
            destructiveIndex={1}
            options={["Settings"]}
            actions={[this.Settings]} />
        </View>
      </View>
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor={Colors.primary}
        tabBarActiveTextColor="#fff"
        tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
        tabBarInactiveTextColor={Colors.steel}
      >
        <Local tabLabel='LOCAL' {...this.props} />
        <MapView tabLabel='LOCATE' {...this.props} />
        <International tabLabel='GLOBAL' {...this.props} />
        <Chats tabLabel='CHATS' {...this.props} />
      </ScrollableTabView>
    </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 23,
    margin: 10,
    marginLeft: 20,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topBit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between'
  },
});

