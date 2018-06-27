import React, { Component } from 'react'
import {
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native'
import {
    Input,
    Button
} from 'react-native-elements'
import {
  WaveIndicator,
} from 'react-native-indicators';
import styles from './Style/LoginStyles'

import { Colors } from '../../Assets/Themes'
//backend things
import * as firebase from 'firebase'
class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        credentials:{
            email: null,
            password: null,
        },
        isSubmitting: false,
        errors:{
            errPassword: null,
            errEmail: null,
        }
      };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerLeft: null,
            headerTintColor: '#fff',
        }
    };

    //backend login

    _handleInput = (key, value) =>{

        this.setState(state =>({
            credentials:{
                ...state.credentials,
                [key] : value,
            }
        }))
    }

    _handleLogin = async () =>{
        const {credentials: {email, password}, isSubmitting} = this.state
        if (!email && !password) {
            alert('nothing was entered')
            this.setState({
                isSubmitting: false,
            })
            return
        }
        if (!isSubmitting) {
            this.setState({
                isSubmitting: true,
            })
        }
        this.setState({
            errors:{
                errPassword: null,
                errEmail: null,
            }
        })
        const that = this

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( user => {
            // please pass the userId to this screen
            that.setState({
                errors:{
                    errEmail: null,
                    errPassword: null,
                },
                isSubmitting: false,
            })
            that.props.navigation.navigate('SignedIn')
        })
        .catch(error => {

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)

          if (errorCode === 'auth/invalid-email') {
            that.setState( state =>({
                isSubmitting: false,
                errors:{
                    ...state.errors,
                    errEmail: 'The email address is badly formatted'
                }
            }))

          } else {

            that.setState(state =>({
                isSubmitting: false,
                errors:{
                    ...state.errors,
                    errPassword: 'Invalid email or password'
                }
            }))
          }
        });
    }

        //end of backend
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
                            leftIcon={{ type: 'simple-line-icon', name: 'user', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid='transparent'
                            inputStyle={{ color: '#fff' }}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('email', input)}
                        />
                        <Text style={styles.texterr}>{this.state.errors.errEmail}</Text>
                        <Input
                            placeholder='Password'
                            leftIcon={{ type: 'simple-line-icon', name: 'key', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid='transparent'
                            inputStyle={{ color: '#fff' }}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleInput('password', input)}
                        />
                        <Text style={styles.texterr}>{this.state.errors.errPassword}</Text>
                            <Button
                                onPress={this._handleLogin.bind(this)}
                                title='LOGIN'
                                icon={{ type: 'simple-line-icon', name: 'login', color: '#fff' }}
                                buttonStyle={styles.button}
                                loading={this.state.isSubmitting}
                                activityIndicatorStyle={{color: 'white'}}
                            />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>Don't have an account yet?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Agreement')}>
                                <Text style={{ marginLeft: 2, marginTop: 20, color: '#fff', fontWeight: 'bold' }}>Create one here</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default Login;