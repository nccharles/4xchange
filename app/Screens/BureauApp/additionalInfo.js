import React, { Component } from 'react'
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    Platform,
    Picker,
    PickerIOS,
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
import DateTimePicker from 'react-native-modal-datetime-picker';

import styles from './Style/SignupStyles'
import { Colors } from '../../Assets/Themes'
import TimePicker from '../../Components/TimePicker'
import open from '../../Assets/Icons/open-sign.png'
import close from '../../Assets/Icons/closed.png'

//backend things
import * as firebase from 'firebase'

class Signup extends Component {
    constructor(props) {
     super(props);
     this.state = {
        info: {
            phone: '',
            address: '',
            openAt: '',
            closeAt: '',
            workingDays: '',
            latitude: null,
            longitude: null,
            companyName: '',
            email: '',
        },
        userId: null,
        errorMessage: null,
        infoId: null,
        loading: true,
        isSubmitting: false,
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
        this.setState({
            showAlert: true
        })
      console.log(currentUser)
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
        alert('new shit')
        this.props.navigation.navigate('AddCurrency')
    }
    //backend end

    _timePicker = async (key) =>{
        try {
          const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 12,
            minute: 0,
            is24Hour: true, // Will display '2 PM'
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            this.setState(state =>({
                info:{
                    ...state.info,
                    [key]: `${hour}: ${minute}`
                }
            }))
          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
    }

    render() {
        const { workingDays } = this.state.info
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
                            placeholder='Detail address, eg: Chic no 230'
                            leftIcon={{ type: 'simple-line-icon', name: 'directions', color: Colors.snow }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            onChangeText={value => this._handleTextInput('address', value)}
                        />
                        <TouchableOpacity onPress={() => this._timePicker('openAt')}>
                            <Input
                                placeholder='Open at'
                                leftIcon={<Image source={open} style={{ width: 30, height: 30, tintColor: Colors.snow }} />}
                                containerStyle={styles.input}
                                underlineColorAndroid={'transparent'}
                                inputStyle={styles.inputStyle}
                                returnKeyType={"next"}
                                editable={true}
                                // onChangeText={value => this._handleTextInput('address', value)}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._timePicker('closeAt')}>
                            <Input
                                placeholder='Closed at'
                                leftIcon={<Image source={close} style={{ width: 30, height: 30, tintColor: Colors.snow }} />}
                                containerStyle={styles.input}
                                underlineColorAndroid={'transparent'}
                                inputStyle={styles.inputStyle}
                                returnKeyType={"next"}
                                editable={true}
                                // onChangeText={value => this._handleTextInput('address', value)}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <View style={styles.ilabel}>
                            <Icon
                                name='calendar'
                                type='simple-line-icon'
                                color= {Colors.snow}
                            />
                            <Text style={styles.label}>
                                Working days
                            </Text>
                        </View>
                        {(Platform.OS === 'ios') ?
                            <Text>IOS</Text>
                            :
                            <Picker
                                mode="dropdown"
                                selectedValue={workingDays}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this._handleTextInput('workingDays', itemValue)}>
                                <Picker.Item label="Monday to Friday" value="Monday to Friday" />
                                <Picker.Item label="Sunday to Firday" value="Sunday to Friday" />
                                <Picker.Item label="Monday to Saturday" value="Monday to Saturday" />
                                <Picker.Item label="Whole week" value="Whole week" />
                            </Picker>
                        }
                            <Button
                                onPress={this._handleSignUp.bind(this)}
                                title='Save'
                                icon={{ type: 'font-awesome', name: 'save', color: '#fff' }}
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