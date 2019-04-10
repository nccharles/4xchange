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
    DatePickerIOS,
    AsyncStorage,
    TimePickerAndroid
} from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Input,
    Button,
    Icon
} from 'react-native-elements'
import {
    Location,
    Permissions
} from 'expo';
import styles from './Style/Infostyles'
import open from '../../Assets/Icons/open-sign.png'
import close from '../../Assets/Icons/closed.png'
import { Colors } from '../../Assets/Themes'
//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone } from '../../Config/constants';
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        let Title = '4xChange   '
        return {
            headerTitle: Title + '   ',
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
                address: null,
                openAt: null,
                closeAt: null,
                workingDays: null,
                latitude: null,
                longitude: null,
                companyName: null,
                email: null,
            },
            phone: null,
            errorMessage: null,
            infoId: null,
            loading: true,
            isSubmitting: false,
        };
    };
    //backend codes
    async componentWillMount() {
        const Phone = await AsyncStorage.getItem(userPhone)
        console.log(Phone)
        this.setState({
            phone: Phone,
        })
        this._getUserInfo()
    }

    componentDidMount() {
        const { latitude, longitude } = this.state.info
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
        await firebase.database().ref(`/infos/${this.state.phone}/publicInfo`)
            .once("value")
            .then(snapshot => {
                try {
                    this.setState({
                        info: {
                            ...this.state.info,
                            ...snapshot.val()
                        },
                    })
                } catch (error) {
                    console.log(error.message);
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
    }

    _handleInfoSave = async () => {
        const { info: { address, closeAt, openAt, workingDays, companyName, email, latitude, longitude }, infoId, isSubmitting } = this.state
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        await firebase.database().ref(`/infos/${this.state.phone}/publicInfo`)
            .set({
                address,

                closeAt,
                openAt,
                workingDays,
                email,
                companyName,
                latitude,
                longitude,
            })
            .then(response => {
                this.setState({
                    isSubmitting: false,
                })
                this.refs.toast.show("Information saved!", () => {
                    this.props.navigation.goBack(null)
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isSubmitting: false,
                })
            })
    }
    _timePicker = async (key) => {
        const pick = Platform.OS === 'ios' ? DatePickerIOS : TimePickerAndroid
        try {
            const { action, hour, minute } = await pick.open({
                hour: 12,
                minute: 0,
                is24Hour: true, // Will display '2 PM'
            });
            if (action !== pick.dismissedAction) {
                this.setState(state => ({
                    info: {
                        ...state.info,
                        [key]: `${hour}: ${minute}`
                    }
                }))
            }
        } catch ({ code, message }) {
            console.log('Cannot open time picker', message);
        }
    }
    render() {
        // const { showAlert } = this.state;
        const { address, email, openAt, closeAt, companyName, workingDays } = this.state.info
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
                            value={email}
                            editable={true}
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
                                color={Colors.dark}
                            />
                            <Text style={styles.label}>
                                Working days
                            </Text>
                        </View>
                        {(Platform.OS === 'ios') ?
                            <PickerIOS
                                mode="dropdown"
                                selectedValue={workingDays}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this._handleTextInput('workingDays', itemValue)}>
                                <PickerIOS.Item label="Monday to Friday" value="Monday to Friday" />
                                <PickerIOS.Item label="Sunday to Firday" value="Sunday to Friday" />
                                <PickerIOS.Item label="Monday to Saturday" value="Monday to Saturday" />
                                <PickerIOS.Item label="Whole week" value="Whole week" />
                            </PickerIOS>
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
                            title='Update Info'
                            icon={{ type: 'feather', name: 'refresh-ccw', color: '#fff' }}
                            buttonStyle={styles.button}
                        />
                    </ScrollView>
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.primary }}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: '#fff' }} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default Info;