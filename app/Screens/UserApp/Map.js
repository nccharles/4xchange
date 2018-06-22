import React, { Component } from 'react';
import { Image, ToastAndroid, AsyncStorage, 
  Platform, Text, View, StyleSheet, Dimensions } from 'react-native'
import { Location, Permissions, MapView } from 'expo';
import MapViewDirections from 'react-native-maps-directions'

import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'
import LocationBank from '../../Assets/MapImage/bank-location.png'
import UserLocation from '../../Assets/MapImage/user.png'
import logout from '../../Assets/Icons/logout.png'
import styles from './Style/MapStyle';

import HeaderBtn from '../../Components/Buttons/HeaderBtn'
// import { map } from 'rxjs/operator/map';
import {userChoice} from '../../Config/constants'

//backend things firebase
import firebase from 'firebase'
import _ from 'lodash'
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.20003
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const locOptions = { enableHighAccuracy: true, distanceInterval: 3 }
// const APIKEY = 'AIzaSyB2L8kbuQG1j0XAeDuYoHm_Ql-8fwRGSms';
// const APIKEY = 'AIzaSyA9P6wB4z6JHlRxElAAVKzbzOAM3mWw_lY'
const APIKEY = 'AIzaSyDQBSAVxZozG5WDEj8nbZbtAxXJUFQUOzI'

const coordinates = [];

class MapScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      forexCoords:[],
      loading: true,
      coords: {}, 
      selectedMarker: ''
    };
  }
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


  componentWillMount = async () => {
    const that = this
    await firebase.database().ref('/infos/').once('value').then(snapshot => {
      const coordinates = _.map( snapshot.val(), (val, uid) =>{
          // return { latitude: val.info.latitude, longitude: val.info.longitude, uid }
          return {...val, uid}
      })
      if(coordinates){
        that.setState({
          forexCoords:[...coordinates],
          loading: false,
        })
      }
    })
    // console.log(this.state.forexCoords[0])

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      await Location.setApiKey(APIKEY);
      const { coords } = await Location.getCurrentPositionAsync({});
      this.setState({ coords })
    } else {
      return alert('Enable to Access your location');
    }
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
  };
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

  render() {
    const { coords:{longitude, latitude, speed}, forexCoords } = this.state
    return (
      <View style={styles.container}>
        {
          latitude && <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            {forexCoords.map((marker, key) => {
              return <MapView.Marker
                          onPress={() => this.props.navigation.navigate('Details',{companyId:  marker.uid})}
                          coordinate={{
                              latitude: marker.info.latitude, 
                              longitude: marker.info.longitude}}
                          key={key} 
                          image={LocationBank}
                          title={marker.info.companyName}/>
            })}
            <MapView.Marker coordinate={{ latitude, longitude }}
              title={"Here you are!."} pinColor={"green"} image={UserLocation} />
          </MapView>
        }
      </View>
    );
  }
}
export default MapScreen