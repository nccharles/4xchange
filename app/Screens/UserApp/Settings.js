import React, { Component } from 'react';
import {
    ScrollView, Share, View, Platform, Text, AsyncStorage, TouchableOpacity, ActivityIndicator
} from 'react-native';
import styles from './Style/DetailStyle'
import { Colors } from '../../Assets/Themes'
import Toast from 'react-native-easy-toast'
import * as firebase from 'firebase'
import { Icon, WebBrowser } from 'expo';
import { userPhone } from '../../Config/constants';
const colors = [
    '#7FB3D5', '#227093', '#B53471', '#5758BB', '#EB9CA8',
    '#8A004F', '#48dbfb', '#1dd1a1', '#00a3e1', '#9980FA'
]

export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            InputDialogVisible: false,
            userPhone: null,
            chatname: null,
            inputedValue: '',
            loading: true
        }
    }
    static navigationOptions = ({ navigation }) => {
        let Title = 'Settings   '
        return {
            headerTitle: Title + '   ',
            headerStyle: {
                backgroundColor: Colors.primary,
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'Lucida-Grande-Bold',
            },
        }
    };
    componentDidMount() {
        this.setState({
            loading: false
        })
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
    _handleForex = async () => {
        const retrieveduserPhone = await AsyncStorage.getItem(userPhone);
        if (retrieveduserPhone) {
            try {
                await firebase.database().ref(`infos/${retrieveduserPhone}/publicInfo`).once("value")
                    .then(snapshot => {
                        const { completed } = snapshot.val()
                        if (completed) {
                            this.setState({
                                signedIn: true,
                                checkedSignIn: true,
                                initialRouter: 'AddCurrency'
                            })
                            this.props.navigation.navigate('AddCurrency')
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
                this.refs.toast.show(error.message)
            }
        } else {
            console.log('Login')
            this.props.navigation.navigate('Login')
        }

    }
    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'http://mail.limitless.rw/'
        );
    };
    render() {
        const { loading } = this.state
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            )
        }
        return (

            <View style={styles.container}>
                <ScrollView style={styles.card}>

                    <TouchableOpacity onPress={this._handleForex.bind(this)} style={styles.itemContainer}>
                        <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-switch' : 'md-switch'} color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Switch  </Text>
                            <Text style={styles.info}>Manage your forex,add currencies</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._handleHelpPress} style={styles.itemContainer}>
                        <Icon.MaterialIcons name="help-outline" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Help</Text>
                            <Text style={styles.info}> FAQ,contact us,privacy policy</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={this.onShare} style={styles.itemContainer}>
                        <Icon.MaterialIcons name="share" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Share   </Text>
                            <Text style={styles.info}>Share with your friends  </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
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
