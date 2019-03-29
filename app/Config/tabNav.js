import React from 'react'
import { Image, View, Dimensions, Text } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Colors } from '../Assets/Themes'
import MapView from '../Screens/UserApp/Map'
import International from '../Screens/UserApp/International'
import Local from '../Screens/UserApp/Local'
import Chats from '../Screens/UserApp/Chatlist'
import location from '../Assets/TabImage/location-map-orientation.png'
import listBureaus from '../Assets/TabImage/bank-512.png'
import globe from '../Assets/TabImage/business.png'
import chatforex from '../Assets/TabImage/chat.png'
const screenheight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width



const TabNavigationScreen = TabNavigator({
  Local: { screen: Local },
  MapView: { screen: MapView },
  International: { screen: International },
  Chats: { screen: Chats },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Local') {
          iconName = listBureaus
          label = 'LOCAL'
        }
        else if (routeName === 'MapView') {
          iconName = location
          label = 'LOCATE'
        }
        else if (routeName === 'International') {
          iconName = globe
          label = 'GLOBAL'
        } else if (routeName === 'Chats') {
          iconName = chatforex
          label = 'CHATS'
        }

        return (
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <Image
              source={iconName}
              tintColor={tintColor}
              resizeMode='cover'
              style={{ width: screenWidth / 15, height: screenWidth / 15, alignSelf: 'center', }}
            />
            <Text style={{ fontSize: 10, color: tintColor, textAlign: 'center' }}>{label}</Text>
          </View>
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: '#B2BABB',
      showLabel: false,
      indicatorStyle: { backgroundColor: 'skyblue', },
      style: {
        backgroundColor: Colors.snow,
        height: screenheight / 12,
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 3,
      }
    },
    tabBarComponent: TabBarBottom,
  })
export default TabNavigationScreen