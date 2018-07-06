import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, ScrollView, 
  Image, View, Text,Linking,Platform, ActivityIndicator 
} from 'react-native';
import {Avatar} from 'react-native-elements'

import styles from './Style/DetailStyle'
// import DetailsHeader from '../../Components/Header/DetailsHeader';
import RoundButton from '../../Components/Buttons/RoundButton'
import Header from '../../Components/Header/DetailsHeader'

import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'
import gps from '../../Assets/Icons/get-directions-button.png'


//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

const colors= [
  '#7FB3D5','#A569BD','#F7DC6F','#E74C3C','#EB9CA8', '#7C878E',
  '#8A004F','#000000','#10069F','#00a3e0','#4CC1A1'
]

export default class Details extends Component {

  // static navigationOptions = ({navigation})=>{
  //   return{
  //       headerTitle: 'ForExchange',
  //       headerStyle: {
  //           backgroundColor: Colors.primary,
  //       },
        
  //       headerTintColor: '#fff',
  //       headerTitleStyle: {
  //         fontWeight: 'bold',
  //       },
  //   }
  // };

  constructor(props){
    super(props)
    this.state = {
      companyId: null,
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
    componentDidMount(){
      const {companyId} = this.props.navigation.state.params
      this.setState({
        companyId: companyId
      })
      this._getCompanyProfile(companyId)
    }

    _getCompanyProfile = async (companyId) => {
      const that = this
      await firebase.database().ref(`/infos/${companyId}/publicInfo`)
      .once('value').then(snapshot => {
        if (snapshot != null) {
          that.setState(state =>({
            userInfo:{
              ...state.userInfo,
              ...snapshot.val()
            },
            loading: false,
          }))
        }
      })
      .catch(err =>{
        that.setState({
          error: true,
        })
      }) ; 
    }
    render() {
      const {loading, userInfo, error} = this.state
      if (loading) {
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )
      }
      if(error){
        return (
          <Text>No Forex Info found</Text>
        )
      }
      //const item = this.props.navigation.state.params
      return (

        <View style={styles.container}>
        <Header 
            onPress2={() => this.props.navigation.goBack()}
            onPress1={()=> this.handlePressDirections()}
            source={gps}/>
          <ScrollView style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{userInfo.companyName.substring(0, 2)}</Text>
          </View>
            {/* <Avatar
                large
                rounded
                title={userInfo.companyName.substring(0, 2)}
                containerStyle={styles.avatar}
                activeOpacity={0.7}
            /> */}
            <View style={styles.titleContainer}>
              <Text
                  style={styles.title}>
                {userInfo.companyName}
              </Text>
            </View>
            <View style={styles.contactContainer}>
              <Text style={styles.contacts}>Contacts</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Email:</Text>
              <Text>{userInfo.email}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Phone:</Text>
              <Text>{userInfo.phone}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Address:</Text>
              <Text>{userInfo.address}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Opening hours:</Text>
              <Text>{`${userInfo.openAt} - ${userInfo.closeAt}`}</Text>
            </View>
            <View style={styles.separator}/>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Working Days:</Text>
              <Text>{userInfo.workingDays}</Text>
            </View>
            <View style={styles.separator}/>
            {/* <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Distance :</Text>
              <Text> 80KM </Text>
            </View> */}
          </ScrollView>
        </View>
      );
    }
  }
