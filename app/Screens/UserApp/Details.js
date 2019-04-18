import React, { Component } from 'react';
import {
  ScrollView, Share, View, Text, Linking, TouchableOpacity, Platform, AsyncStorage, ActivityIndicator
} from 'react-native';
import styles from './Style/DetailStyle'
import Header from '../../Components/Header/DetailsHeader'
import ChatBtn from '../../Components/Buttons/BtnChat'
import { Colors } from '../../Assets/Themes'
import gps from '../../Assets/Icons/get-directions-button.png'
import NameDialogComponent from '../../Components/NameModal/Usermodal';
import Toast, { DURATION } from 'react-native-easy-toast'
import { LinearGradient } from "expo";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { chatName, chatNum } from '../../Config/constants';
import { Icon } from 'expo';
const colors = [
  '#7FB3D5', '#227093', '#B53471', '#5758BB',
  '#EB9CA8', '#48dbfb', '#00a3e1', '#9980FA'
]

export default class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      InputDialogVisible: false,
      userPhone: null,
      chatname: null,
      inputedValue: '',
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
      },
      locate: true,
      loading: true,
      error: false,
    }
  }
  handlePressDirections = () => {
    if (!this.state.userInfo.latitude && !this.state.userInfo.longitude) {
      this.refs.toast.show('Enable to open map');
      return
    }
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${this.state.userInfo.latitude},${this.state.userInfo.longitude}`,
      android: `http://maps.google.com/?q=${this.state.userInfo.latitude},${this.state.userInfo.longitude}`
    });
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    }).catch(err => {
      this.refs.toast.show(err.message);
    });
  };
  componentDidMount() {
    const { userPhone } = this.props.navigation.state.params
    this.setState({
      userPhone: userPhone
    })
    this._getCompanyProfile(userPhone)
  }
  _handleChatNameInput = (value) => {
    if (value) {
      this.setState({
        inputedValue: value
      })
      return
    }
    this.setState({
      inputedValue: ''
    })
  }
  handleCustomer = async () => {
    const chats = await AsyncStorage.getItem(chatNum)
    if (chats) {
      this.props.navigation.navigate("Chat", { forex: this.state.userInfo.companyName, forexPhone: this.state.userPhone })
    } else {
      this.setState({ InputDialogVisible: true })
    }
  }
  handleChat = async () => {
    if (this.state.inputedValue.length <= 2) {
      this.refs.toast.show('Name must be atleast 3 characters');
      return
    }
    this.setState({ InputDialogVisible: false })
    await AsyncStorage.setItem(chatName, this.state.inputedValue)
    this.props.navigation.navigate('userNumber', { customer: this.state.inputedValue, forex: this.state.userInfo.companyName, forexPhone: this.state.userInfo.phone });

  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `4xChange | The best currency rate deal on https://play.google.com/store/apps/details?id=com.limitlessafricanapps.i4xChange`,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      this.refs.toast.show(error.message);
    }
  };

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
    const { loading, userInfo, error } = this.state
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
          source={this.state.userInfo.latitude ? gps : ''} />
        <ScrollView style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: colors[Math.floor(Math.random() * colors.length)] }]}>
              <Text style={styles.avatarTxt}>{userInfo.companyName.substring(0, 2).toUpperCase()}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text
                style={styles.title}>
                {userInfo.companyName + '   '}
              </Text>
              <Text style={styles.itemTitle}>Information  </Text>
            </View>
          </View>
          <LinearGradient
            colors={Colors.gradientColors}
            start={{ x: 1.0, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.linearseparator} />
          <View style={styles.itemContainer}>
            <Icon.MaterialIcons name="location-city" color={Colors.primary} size={23} />
            <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Country  </Text>
              <Text style={styles.info}>{userInfo.countryName}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Icon.Entypo name="address" color={Colors.primary} size={23} />
            <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Address  </Text>
              <Text style={styles.info}>{userInfo.address}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Icon.MaterialCommunityIcons name="calendar-clock" color={Colors.primary} size={23} />
            <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Opening hours  </Text>
              <Text style={styles.info}>{`${userInfo.openAt} - ${userInfo.closeAt}`}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Icon.MaterialCommunityIcons name="calendar-check" color={Colors.primary} size={23} />
            <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Working Days  </Text>
              <Text style={styles.info}>{userInfo.workingDays}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity onPress={this.onShare} style={styles.itemContainer}>
            <Icon.MaterialIcons name="share" color={Colors.primary} size={23} />
            <View style={styles.infocontent}>
              <Text style={styles.infoTitle}>Share   </Text>
              <Text style={styles.info}>Share to your friends  </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <ChatBtn onPress={this.handleCustomer} />
        <NameDialogComponent
          visible={this.state.InputDialogVisible}
          title="Your Name  "
          description="Add your name that will show in chat"
          onChangeTextName={(value) => this._handleChatNameInput(value)}
          valueName={this.state.chatname}
          onPress={this.handleChat}
          onPressCancel={() => this.setState({ InputDialogVisible: false })}
          label2="Continue   "
        />
        <Toast ref="toast"
          style={{ backgroundColor: Colors.primary }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: '#fff' }} />
      </View>
    );
  }
}
