import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { LinearGradient } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';
import { userPhone, userChoice } from '../../Config/constants'
// import money from '../../Assets/Background/money.jpg'
import * as firebase from 'firebase'
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
        console.log(retrieveduserPhone)
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
                this.props.navigation.navigate('TabNavScreen')
            })
            // console.log(value)
        } catch (error) {
            // ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
            ToastAndroid.showWithGravity(
                'Error: faild to remember your choice',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../Assets/Logo/title.png')}
                        style={styles.image} />
                </View>
                <View style={styles.content}>
                    <LinearGradient
                        colors={Colors.gradientColors}
                        start={{ x: 1.0, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.topbutton}
                    >
                        <TouchableOpacity
                            onPress={this._handleUser.bind(this)}
                        >
                            <Text style={styles.buttonText}> Locate Forex </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={Colors.gradientColors}
                        start={{ x: 1.0, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.bottombutton}
                    >
                        <TouchableOpacity
                            onPress={this._handleForex.bind(this)}
                        >
                            <Text style={styles.buttonText}> Manage a Forex </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }
}
