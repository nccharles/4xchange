import React, { Component } from 'react';
import {
  Image, ToastAndroid, AsyncStorage,
  Platform, Text, View, StyleSheet, Dimensions
} from 'react-native'
import { Location, Permissions, MapView } from 'expo';
import MapViewDirections from 'react-native-maps-directions'

import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'
import LocationBank from '../../Assets/MapImage/dollar-spot.png'
import UserLocation from '../../Assets/MapImage/user.png'
import logout from '../../Assets/Icons/logout.png'
import styles from './Style/MapStyle';
import HeaderBtn from '../../Components/Buttons/HeaderBtn'
// import { map } from 'rxjs/operator/map';
import { userChoice } from '../../Config/constants'

//backend things firebase
import firebase from 'firebase'
import _ from 'lodash'
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.20003
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const locOptions = { enableHighAccuracy: true, distanceInterval: 3 }
class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forexCoords: [],
      loading: true,
      coords: {},
      selectedMarker: ''
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    let Title = '4xChange   '
    return {
      headerTitle: Title + '   ',
      headerLeft: null,
      headerRight: (
        <HeaderBtn
          onPress={() => params.handleThis()}
          source={logout} />
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
      const coordinates = _.map(snapshot.val(), (val, uid) => {
        // return { latitude: val.info.latitude, longitude: val.info.longitude, uid }
        return { ...val.publicInfo, uid }
      })
      if (coordinates) {
        that.setState({
          forexCoords: [...coordinates],
          loading: false,
        })
      }
    })
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return ToastAndroid.showWithGravity(
        "Enable to Access your location",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({ coords });
    this.props.navigation.setParams({
      handleThis: this._clearChoiceCache
    });
  };
  _clearChoiceCache = async () => {
    try {
      await AsyncStorage.setItem(userChoice, '').then(() => {
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
    const { coords: { longitude, latitude, speed }, forexCoords } = this.state
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
                onPress={() => this.props.navigation.navigate('Details', { userPhone: marker.userPhone })}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }}
                key={key}
                image={LocationBank}
                title={marker.companyName} />
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