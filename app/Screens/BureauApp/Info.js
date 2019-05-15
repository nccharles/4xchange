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
import moment from 'moment'
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Input,
    Button,
    Icon
} from 'react-native-elements'
import {
    Location,
    Permissions, LinearGradient
} from 'expo';
import styles from './Style/Infostyles'
import open from '../../Assets/Icons/open-sign.png'
import close from '../../Assets/Icons/closed.png'
import { Colors } from '../../Assets/Themes'
//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName } from '../../Config/constants';
class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        let Title = 'Update'
        return {
            headerTitle: Title,
            headerStyle: {
                backgroundColor: Colors.primary,
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'Lucida-Grande-Bold',
            },
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            // showAlert: false,
            isOpenTimePickerVisible: false,
            isCloseTimePickerVisible: false,
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
    showOpenTimePicker = () => this.setState({ isOpenTimePickerVisible: true });
    showCloseTimePicker = () => this.setState({ isCloseTimePickerVisible: true });
    hideTimePicker = () => this.setState({ isOpenTimePickerVisible: false, isCloseTimePickerVisible: false });
    handleOpenTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                openAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: false
        }));
    };
    handleCloseTimePicked = time => {
        this.setState(state => ({
            info: {
                ...state.info,
                closeAt: moment(time).format("HH:mm")
            },
            isTimePickerVisible: false
        }));
    };
    _handleInfoUpdate = async () => {
        const { info: { address, closeAt, openAt, workingDays, companyName, email, latitude, longitude }, infoId, isSubmitting } = this.state
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })

        await firebase.database().ref(`/infos/${this.state.phone}/publicInfo`)
            .update({
                address,
                closeAt,
                openAt,
                workingDays,
                email,
                completed: true,
                companyName,
                latitude,
                longitude,
            })
            .then(async () => {
                await AsyncStorage.setItem(cName, companyName).then(() => {
                    this.setState({
                        isSubmitting: false,
                    })
                })

                this.refs.toast.show("Information saved!")
                const { navigation } = this.props
                navigation.goBack();
                const { setUpdate } = navigation.state.params
                setUpdate({ forexPhone: this.state.phone })

            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isSubmitting: false,
                })
            })
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
                            leftIcon={{ type: 'material-community', name: 'city', color: Colors.primaryDark }}
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
                            leftIcon={{ type: 'entypo', name: 'email', color: Colors.primary }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onChangeText={(input) => this._handleTextInput('email', input)}
                            value={email}
                            editable={true}
                        />
                        <Input
                            placeholder='Detail address, eg: Chic no 230'
                            leftIcon={{ type: 'simple-line-icon', name: 'directions', color: Colors.primaryDark }}
                            containerStyle={styles.input}
                            underlineColorAndroid={'transparent'}
                            inputStyle={styles.inputStyle}
                            returnKeyType={"next"}
                            editable={true}
                            onChangeText={value => this._handleTextInput('address', value)}
                            value={address}
                        />
                        <TouchableOpacity onPress={this.showOpenTimePicker}>
                            <Input
                                placeholder='Open at'
                                leftIcon={<Image source={open} style={{ width: 30, height: 30, tintColor: Colors.primaryDark }} />}
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
                        <DateTimePicker
                            isVisible={this.state.isOpenTimePickerVisible}
                            onConfirm={this.handleOpenTimePicked}
                            onCancel={this.hideTimePicker}
                            mode="time"
                        />
                        <DateTimePicker
                            isVisible={this.state.isCloseTimePickerVisible}
                            onConfirm={this.handleCloseTimePicked}
                            onCancel={this.hideTimePicker}
                            mode="time"
                        />
                        <TouchableOpacity onPress={this.showCloseTimePicker}>
                            <Input
                                placeholder='Closed at'
                                leftIcon={<Image source={close} style={{ width: 30, height: 30, tintColor: Colors.primaryDark }} />}
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
                                color={Colors.primaryDark}
                            />
                            <Text style={styles.label}>
                                Working days
                            </Text>
                        </View>
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
                        <LinearGradient
                            colors={Colors.gradientColors}
                            start={{ x: 1.0, y: 0.5 }}
                            end={{ x: 0, y: 0.5 }}
                            style={styles.button}
                        >
                            <Button
                                onPress={this._handleInfoUpdate.bind(this)}
                                title='Update Info'
                                icon={{ type: 'feather', name: 'refresh-ccw', color: '#fff' }}
                            />
                        </LinearGradient>
                    </ScrollView>
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.primary }}
                        position='bottom'
                        positionValue={140}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={1}
                        textStyle={{ color: '#fff' }} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default Info;