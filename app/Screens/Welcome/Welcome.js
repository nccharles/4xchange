import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    AsyncStorage,
    Platform
} from 'react-native';
import { Icon, LinearGradient } from 'expo';
import Toast, { DURATION } from 'react-native-easy-toast'
import styles from './styles'
import { Colors } from '../../Assets/Themes';
import { userPhone, userChoice } from '../../Config/constants'
// import money from '../../Assets/Background/money.jpg'
import * as firebase from 'firebase'
import { registerForPushNotificationsAsync } from '../../Config/notice';
import Swiper from '../../Components/Swiper/Swiper';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            signedIn: false,
            checkedSignIn: false,
            userSignedIn: false,
            userViewConformed: false,
            initialRouter: 'WelcomeStack'
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true
        }
    };

    showAlert = () => {
        this.setState({ showAlert: true });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    _handleForex = async () => {
        const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
        registerForPushNotificationsAsync();
        if (retrieveduserPhone) {
            try {
                await firebase.database().ref(`infos/${retrieveduserPhone}/publicInfo`).once("value")
                    .then(snapshot => {
                        const { completed } = snapshot.val()
                        if (completed) {
                            this.setState({
                                signedIn: true,
                                checkedSignIn: true,
                                initialRouter: 'SignedIn'
                            })
                            this.props.navigation.navigate('SignedIn')
                        } else {
                            this.setState({
                                signedIn: true,
                                checkedSignIn: true,
                                initialRouter: 'InfoRegis'
                            })
                            this.props.navigation.navigate('InfoRegis')
                        }
                    }).catch(error => {
                        this.setState({
                            signedIn: true,
                            checkedSignIn: true,
                            initialRouter: 'InfoRegis'
                        })
                        this.props.navigation.navigate('InfoRegis')
                    })
            } catch (error) {
                console.log(error.message)
            }
        } else {
            this.props.navigation.navigate('Login')
        }

    }
    _handleUser = async () => {

        try {
            await AsyncStorage.setItem(userChoice, 'true').then(() => {
                registerForPushNotificationsAsync();
                this.props.navigation.navigate('TabNavScreen')
            })
            // console.log(value)
        } catch (error) {

            this.refs.toast.show("Error: faild to remember your choice");
        }
    }
    render() {
        return (
            <Swiper handleThis={this._handleUser.bind(this)}>
                {/* First screen */}
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 1.0, y: 0 }}
                    style={styles.slide}
                >
                    <Icon.Ionicons name={Platform.OS === 'ios' ? "ios-cash" : 'logo-usd'} size={100} color={'#FFFFFF'} />
                    <Text style={styles.header}>Welcome</Text>
                    <Text style={styles.text}>The easiest way to find, locate and exchange foreign currencies</Text>
                </LinearGradient>
                {/* Second screen */}
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 1.0, y: 0 }}
                    style={styles.slide}
                >
                    <Icon.Ionicons name={Platform.OS === 'ios' ? "ios-pin" : 'md-pin'} size={100} color={'#FFFFFF'} />
                    <Text style={styles.header}>Locate</Text>
                    <Text style={styles.text}>Find a forex bureau near your location Best Currency exchange today</Text>
                </LinearGradient>
                {/* Third screen */}
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 0.5, y: 1.0 }}
                    end={{ x: 1.0, y: 0 }}
                    style={styles.slide}
                >
                    <Icon.Ionicons name={Platform.OS === 'ios' ? "ios-chatboxes" : 'md-chatboxes'} size={100} color={'#FFFFFF'} />
                    <Text style={styles.header}>Chats</Text>
                    <Text style={styles.text}>Update/publish your currency on our Online public billboard Get Chats and contacted by clients</Text>
                </LinearGradient>
            </Swiper>
        )
    }
}
