import React, { Component } from 'react'
import {
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    Platform,
    Picker,
    PickerIOS,
    ToastAndroid,
    TimePickerAndroid
} from 'react-native'
import {
    Input,
    Button,
    Icon
} from 'react-native-elements'
import {
    Constants,
    Location,
    Permissions
} from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts'
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './Style/Infostyles'
import TimePicker from '../../Components/TimePicker'
import open from '../../Assets/Icons/open-sign.png'
import close from '../../Assets/Icons/closed.png'
import { Colors } from '../../Assets/Themes'

//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '4xChange',
            headerStyle: {
                backgroundColor: Colors.primary,
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            // showAlert: false,
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
    };
    //backend codes
    async componentWillMount() {
        const { uid, displayName, email } = await firebase.auth().currentUser
        this.setState(state => ({
            info: {
                ...state.info,
                companyName: displayName,
                email: email,
            },
            userId: uid,
        }))
        this._getUserInfo()
    }

    componentDidMount() {
        const { latitude, longitude } = this.state.info
        alert('')
        if (!latitude && !longitude) {
            this._getCurrentUserLocation();
        }
    }

    _handleTextInput = (key, value) => {
        this.setState(state => ({
            info: {
                ...state.info,
                [key]: value
            }
        }))
    }
    _getUserInfo = async () => {
        const { userId } = this.state
        const that = this
        await firebase.database().ref(`/infos/${userId}/info`).on('value', snapshot => {
            //console.log(snapshot)
            if (snapshot != null) {
                that.setState(state => ({
                    info: {
                        ...state.info,
                        ...snapshot.val()
                    },
                }))
            }
        });
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

    _handleInfoSave = async () => {
        const { info: { address, phone, closeAt, openAt, workingDays, companyName, email, latitude, longitude }, userId, infoId, isSubmitting } = this.state
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        const that = this
        await firebase.database().ref(`/infos/${userId}/info`)
            .set({
                address,
                phone,
                closeAt,
                openAt,
                workingDays,
                email,
                companyName,
                latitude,
                longitude,
            })
            .then(response => {
                that.setState({
                    isSubmitting: false,
                })
                ToastAndroid.showWithGravityAndOffset(
                    'Information saved!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                that.props.navigation.goBack(null)
            })
            .catch(err => {
                console.log(err)
                that.setState({
                    isSubmitting: false,
                })
            })
    }
    //end of backend codes
    // hideAlert = () => {
    //     this.setState({
    //         showAlert: false
    //     });
    // };
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
        // const { showAlert } = this.state;
        const { address, openAt, closeAt, companyName, phone, workingDays } = this.state.info
        return (
            <View
                onResponderRelease={(event) => { Keyboard.dismiss(); }}
                style={styles.container}>

                {/* <Text style={styles.logo}>Forex App</Text> */}
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={30}
                >
                    <ScrollView>
                        <Input
                            placeholder='Company name'
                            leftIcon={{ type: 'material-community', name: 'city', color: Colors.dark }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            onChangeText={value => this._handleTextInput('companyName', value)}
                            editable={true}
                            value={companyName}
                        />
                        <Input
                            placeholder='Phone'
                            leftIcon={{ type: 'simple-line-icon', name: 'phone', color: Colors.dark }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            keyboardType="numeric"
                            onChangeText={value => this._handleTextInput('phone', value)}
                            editable={true}
                            value={phone}
                        />
                        <Input
                            placeholder='Detail address, eg: Chic no 230'
                            leftIcon={{ type: 'simple-line-icon', name: 'directions', color: Colors.dark }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            onChangeText={value => this._handleTextInput('address', value)}
                            value={address}
                        />
                        <TouchableOpacity onPress={() => this._timePicker('openAt')}>
                            <Input
                                placeholder='Open at'
                                leftIcon={<Image source={open} style={{ width: 30, height: 30, tintColor: Colors.dark }} />}
                                containerStyle={styles.input}
                                underlineColorAndroid={'transparent'}
                                inputStyle={styles.inputStyle}
                                returnKeyType={"next"}
                                editable={true}
                                // onChangeText={value => this._handleTextInput('address', value)}
                                editable={false}
                                value={openAt}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._timePicker('closeAt')}>
                            <Input
                                placeholder='Closed at'
                                leftIcon={<Image source={close} style={{ width: 30, height: 30, tintColor: Colors.dark }} />}
                                containerStyle={styles.input}
                                underlineColorAndroid={'transparent'}
                                inputStyle={styles.inputStyle}
                                returnKeyType={"next"}
                                editable={true}
                                // onChangeText={value => this._handleTextInput('address', value)}
                                editable={false}
                                value={closeAt}
                            />
                        </TouchableOpacity>
                        <View style={styles.ilabel}>
                            <Icon
                                name='calendar'
                                type='simple-line-icon'
                                color= {Colors.dark}
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
                            onPress={this._handleInfoSave.bind(this)}
                            title='ADD INFO'
                            icon={{ type: 'simple-line-icon', name: 'plus', color: '#fff' }}
                            buttonStyle={styles.button}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default Info;