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

import styles from './Style/SignupStyles'
import { Colors } from '../../Assets/Themes'

//backend things
import * as firebase from 'firebase'

class Signup extends Component {
    constructor(props) {
     super(props);
     this.state = {
       credentails: {
         email: null,
         password: null,
         confirmPassword: null,
         companyName: null,
       },
       isSubmitting: false,
    //    isLoading: false,
       errs:{
           password: null,
           email: null,
       }
     };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerTintColor: '#fff',
        }
    };


    //luc's backend things

    componentDidMount() {
      const currentUser = firebase.auth().currentUser
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
        // console.log(this.state.credentails)
        const {credentails: {email, password, confirmPassword, companyName}, isSubmitting} = this.state
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true,
            errors:{
                password: null,
                email: null,
            }
        })
        if (!email && !password) {
            alert('nothing was inserted')
            this.setState({
                isSubmitting: false,
            })
            return
        }
        
        if (password !== confirmPassword) {

            this.setState(state => ({
                isSubmitting: false,
                errs:{
                    password: 'password not matching',
                }
            }))

            console.log('password not matching')
            return
        } 
        if(password.length < 6){
            this.setState(state => ({
                isSubmitting: false,
                errs:{
                    password: 'password must be at least 6 characters',
                }
            }))
            return
        }


        const atSign = email.indexOf('@')

        if (atSign < 1) {
            this.setState(state => ({
                errs:{
                    ...state.errs,
                    email: 'Invalid email',
                    isSubmitting: false,
                }
            }))
            return
        }

        const that = this

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( user => {

            that.setState({
                errors:{
                    password: null,
                    email: null,
                },
                isSubmitting: false,
            })

           const currentUser = firebase.auth().currentUser;

           currentUser.updateProfile({
             displayName: '',
             photoURL: "https://example.com/jane-q-user/profile.jpg"
           }).then(function() {
             that.props.navigation.navigate('InfoRegis', {userId: currentUser.uid, email: currentUser.email})
           }).catch(function(error) {
                // console.log(error)
           });
        })
        .catch(function(error) {
            // console.log(error)
            return   
        });
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
                            placeholder='Email'
                            leftIcon={{ type: 'entypo', name: 'email', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('email', input)}
                        />

                        <Text style={styles.texterr}>{this.state.errs.email}</Text>
                        <Input
                            placeholder='Password'
                            leftIcon={{ type: 'simple-line-icon', name: 'key', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('password', input)}
                        />
                        <Text style={styles.texterr}>{this.state.errs.password}</Text>
                        <Input
                            placeholder='Confirm password'
                            leftIcon={{ type: 'simple-line-icon', name: 'key', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('confirmPassword', input)}
                        />
                        <Button
                            onPress={this._handleSignUp.bind(this)}
                            title='Add'
                            icon={{ type: 'materialIcons', name: 'add-circle-outline', color: '#fff' }}
                            buttonStyle={styles.button}
                            loading={this.state.isSubmitting}
                            activityIndicatorStyle={{color: 'white'}}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
export default Signup;