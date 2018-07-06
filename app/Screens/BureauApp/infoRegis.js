import React, { Component } from 'react'
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import {
    Icon,
    Button,
    Input
} from 'react-native-elements'
import {
  WaveIndicator,
} from 'react-native-indicators';
import AwesomeAlert from 'react-native-awesome-alerts'

import styles from './Style/SignupStyles'
import { Colors } from '../../Assets/Themes'

//backend things
import * as firebase from 'firebase'

class Signup extends Component {
    constructor(props) {
     super(props);
     this.state = {
       credentails: {
        tinNumber: null,
        licenceNumber: null,
        phoneNumber: null,
        companyName: null,
       },
       isSubmitting: false,
       showAlert: false,
    //    isLoading: false,
     };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerTintColor: '#fff',
        }
    };

    //Alert message that come when the page is opening
    hideAlert = () => {
        this._queryExistingRegInfo()
        this.setState({
          showAlert: false
        });
    };

    //luc's backend things

    async componentDidMount() {
        const currentUser = firebase.auth().currentUser
        const {uid, email} = currentUser
        this.setState({
            showAlert: true,
            userId: uid,
            email
        })
    }
    _queryExistingRegInfo = () => {
        const {userId} = this.state
        firebase.database().ref(`infos/${userId}/businessInfo`)
        .once('value')
        .then(sanpshot =>{
            this.setState({
                credentails:{
                    ...this.state.credentails,
                    ...sanpshot.val()
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }
    _getCurrentUserLocation = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            return alert('Enable to Access your location');
        }

        const location = await Location.getCurrentPositionAsync({});
        //const address = await Location.geocodeAsync()
        //console.log(address)
        const { latitude, longitude } = location.coords
        this.setState(state => ({
            info: {
                ...state.info,
                latitude,
                longitude,
            }
        }));
        //console.log(latitude, longitude)
    }

    _handleInput = (key, value) =>{
        this.setState(state =>({
            credentails:{
                ...state.credentails,
                [key]: value,
            }
        }))
    }

    _handleSignUp = async () =>{
        const that = this
        this.setState({
            isSubmitting: true,
        })
        const {credentails: {tinNumber, licenceNumber, phoneNumber, companyName}, userId, email} = this.state
        firebase.database().ref(`infos/${userId}/businessInfo`).set({
            tinNumber,
            licenceNumber,
            companyName,
            phoneNumber,
            completed: true,
            isSubmitting: false,
        }).then(resp => {
            console.log(resp)
            that.props.navigation.navigate('AdditionalInfo', {userId, phoneNumber, companyName, email}) 
        }).catch( error => {
            console.log(error)
        })
    }
    //backend end

    render() {
        return (
            <View
                onResponderRelease={(event) => { Keyboard.dismiss(); }}
                style={styles.container}>
                <Text style={styles.logo}>4xChange</Text>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={30}
                >
                    <ScrollView>
                        <Input
                            placeholder='Company name'
                            leftIcon={{ type: 'material-community', name: 'city', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('companyName', input)}
                            value={this.state.credentails.companyName}
                        />
                        <Input
                            placeholder='TIN number'
                            leftIcon={{ type: 'foundation', name: 'database', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('tinNumber', input)}
                            value={this.state.credentails.tinNumber}
                        />
                        <Input
                            placeholder='Licence number'
                            leftIcon={{ type: 'font-awesome', name: 'drivers-license-o', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('licenceNumber', input)}
                            value={this.state.credentails.licenceNumber}
                        />
                        <Input
                            placeholder='Phone'
                            leftIcon={{ type: 'simple-line-icon', name: 'phone', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            keyboardType="numeric"
                            onChangeText={value => this._handleInput('phoneNumber', value)}
                            value={this.state.credentails.phoneNumber}
                            editable={true}
                        />
                        <Button
                            onPress={this._handleSignUp.bind(this)}
                            title='Add'
                            icon={{ type: 'material-community', name: 'account-plus-outline', color: '#fff' }}
                            buttonStyle={styles.button}
                            loading={this.state.isSubmitting}
                            disabled={this.state.isSubmitting}
                            activityIndicatorStyle={{color: 'white'}}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Location"
                    message="4xChange is going to take your current location please make sure you are currently sitting in your forex bureau"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Ok got it"
                    confirmButtonColor={Colors.dark}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    />
            </View>
        )
    }
}
export default Signup;