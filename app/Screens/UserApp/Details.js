import React, { Component } from 'react';
import {
  ScrollView, View, Text, Linking, Platform, ActivityIndicator
} from 'react-native';
import SVGImage from 'react-native-svg-image'

import styles from './Style/DetailStyle'
import Header from '../../Components/Header/DetailsHeader'

import { Colors } from '../../Assets/Themes'
import gps from '../../Assets/Icons/get-directions-button.png'


//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'


const colors = [
  '#7FB3D5', '#A569BD', '#F7DC6F', '#E74C3C', '#EB9CA8', '#7C878E',
  '#8A004F', '#000000', '#10069F', '#00a3e1', '#4CC1A1'
]

export default class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userPhone: null,
      userInfo: {
        phone: '',
        address: '',
        openAt: '',
        closeAt: '',
        workingDays: '',
        latitude: '',
        longitude: '',
        companyName: '',
        email: '',
        countryName: 'Rwanda',
        flag: 'https://restcountries.eu/data/rwa.svg',
      },
      loading: true,
      error: false,
    }
  }
  handlePressDirections = () => {
    let daddr = encodeURIComponent(`${this.state.company}`);

    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  };
  componentDidMount() {
    const { userPhone } = this.props.navigation.state.params
    this.setState({
      userPhone: userPhone
    })
    this._getCompanyProfile(userPhone)
  }

  _getCompanyProfile = async (userPhone) => {
    const that = this
    await firebase.database().ref(`/infos/${userPhone}/publicInfo`)
      .once('value').then(snapshot => {
        if (snapshot != null) {
          that.setState(state => ({
            userInfo: {
              ...state.userInfo,
              ...snapshot.val()
            },
            loading: false,
          }))
        }
      })
      .catch(err => {
        that.setState({
          error: true,
        })
      });
  }
  render() {
    const { loading, userInfo, userPhone, error } = this.state
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }
    if (error) {
      return (
        <Text>No Forex Info found</Text>
      )
    }
    //const item = this.props.navigation.state.params
    return (

      <View style={styles.container}>
        <Header
          onPress2={() => this.props.navigation.goBack()}
          onPress1={() => this.handlePressDirections()}
          source={gps} />
        <ScrollView style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{userInfo.companyName.substring(0, 2)}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}>
              {userInfo.companyName + '   '}
            </Text>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contacts}>Contacts   </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Country:   </Text>
            <Text>{userInfo.countryName}</Text>
            <SVGImage
              style={styles.flag_icon}
              source={{ uri: userInfo.flag }}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Email:   </Text>
            <Text>{userInfo.email}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Phone:   </Text>
            <Text>{userPhone}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Address:   </Text>
            <Text>{userInfo.address}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Opening hours:   </Text>
            <Text>{`${userInfo.openAt} - ${userInfo.closeAt}`}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Working Days:   </Text>
            <Text>{userInfo.workingDays}</Text>
          </View>
          <View style={styles.separator} />
        </ScrollView>
      </View>
    );
  }
}
