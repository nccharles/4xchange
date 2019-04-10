import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Picker,
  TimePickerAndroid
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import { Location, Permissions } from "expo";
import { Icon, Button, Input } from "react-native-elements";
import styles from "./Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
import open from "../../Assets/Icons/open-sign.png";
import close from "../../Assets/Icons/closed.png";

//backend things
import * as firebase from "firebase";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        phoneNumber: "",
        address: "",
        openAt: "",
        closeAt: "",
        workingDays: "Monday to Friday",
        latitude: null,
        longitude: null,
        companyName: "",
        email: "",
        countryName: "",
        flag: ""
      },
      userPhone: null,
      errorMessage: null,
      infoId: null,
      loading: true,
      isSubmitting: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerTintColor: "#fff"
    };
  };

  //luc's backend things

  componentDidMount() {
    const {
      userPhone,
      email,
      companyName,
      countryName,
      flag
    } = this.props.navigation.state.params;
    this.setState({
      showAlert: true,
      userPhone,
      info: {
        ...this.state.info,
        email,
        companyName,
        countryName,
        flag
      }
    });
    const { latitude, longitude } = this.state.info;
    if (!latitude && !longitude) {
      this._getCurrentUserLocation();
    }
  }

  _handleTextInput = (key, value) => {
    console.log(key, value);
    this.setState(state => ({
      info: {
        ...state.info,
        [key]: value
      }
    }));
  };

  _getCurrentUserLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      return alert("Enable to Access your location");
    }

    const location = await Location.getCurrentPositionAsync({});
    //const address = await Location.geocodeAsync()
    //console.log(address)
    const { latitude, longitude } = location.coords;
    this.setState(state => ({
      info: {
        ...state.info,
        latitude,
        longitude
      }
    }));
    //console.log(latitude, longitude)
  };

  _handleInfoSave = async () => {
    const {
      info: {
        address,

        closeAt,
        openAt,
        workingDays,
        companyName,
        email,
        latitude,
        longitude,
        countryName,
        flag
      },
      userPhone,
      isSubmitting
    } = this.state;
    if (isSubmitting) {
      return;
    }
    this.setState({
      isSubmitting: true
    });
    const that = this;
    await firebase
      .database()
      .ref(`/infos/${userPhone}/publicInfo`)
      .set({
        address,

        closeAt,
        openAt,
        workingDays,
        email,
        userPhone,
        companyName,
        latitude,
        longitude,
        countryName,
        flag,
        completed: true,
        timestamp: this.timestamp
      })
      .then(response => {
        this.refs.toast.show("Information saved!", () => {
          that.props.navigation.navigate("SignedIn");
          that.setState({
            isSubmitting: false
          });
        });
      })
      .catch(err => {
        console.log(err);
        that.setState({
          isSubmitting: false
        });
      });
  };
  //backend end
  get timestamp() {
    return new Date().valueOf();
  }
  _timePicker = async key => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: true // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState(state => ({
          info: {
            ...state.info,
            [key]: `${hour}: ${minute}`
          }
        }));
      }
    } catch ({ code, message }) {
      console.log(code, message);
    }
  };

  render() {
    const { address, openAt, closeAt, workingDays } = this.state.info;
    return (
      <View
        onResponderRelease={event => {
          Keyboard.dismiss();
        }}
        style={styles.container}
      >
        <Text style={styles.logo}>4xChange   </Text>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={30}
        >
          <ScrollView>
            <Input
              placeholder="Detail address, eg: Chic no 230"
              leftIcon={{
                type: "simple-line-icon",
                name: "directions",
                color: Colors.snow
              }}
              containerStyle={styles.input}
              underlineColorAndroid={"transparent"}
              inputStyle={styles.inputStyle}
              returnKeyType={"next"}
              editable={true}
              value={address}
              onChangeText={value => this._handleTextInput("address", value)}
            />
            <TouchableOpacity onPress={() => this._timePicker("openAt")}>
              <Input
                placeholder="Open at"
                leftIcon={
                  <Image
                    source={open}
                    style={{ width: 30, height: 30, tintColor: Colors.snow }}
                  />
                }
                containerStyle={styles.input}
                underlineColorAndroid={"transparent"}
                inputStyle={styles.inputStyle}
                returnKeyType={"next"}
                editable={true}
                // onChangeText={value => this._handleTextInput('address', value)}
                editable={false}
                value={openAt}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._timePicker("closeAt")}>
              <Input
                placeholder="Closed at"
                leftIcon={
                  <Image
                    source={close}
                    style={{ width: 30, height: 30, tintColor: Colors.snow }}
                  />
                }
                containerStyle={styles.input}
                underlineColorAndroid={"transparent"}
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
                name="calendar"
                type="simple-line-icon"
                color={Colors.snow}
              />
              <Text style={styles.label}>Working days</Text>
            </View>
            {Platform.OS === "ios" ? (
              <Text>IOS</Text>
            ) : (
                <Picker
                  mode="dropdown"
                  selectedValue={workingDays}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this._handleTextInput("workingDays", itemValue)
                  }
                >
                  <Picker.Item
                    label="Monday to Friday"
                    value="Monday to Friday"
                  />
                  <Picker.Item
                    label="Sunday to Friday"
                    value="Sunday to Friday"
                  />
                  <Picker.Item
                    label="Monday to Saturday"
                    value="Monday to Saturday"
                  />
                  <Picker.Item label="Whole week" value="Whole week" />
                </Picker>
              )}
            <Button
              onPress={this._handleInfoSave.bind(this)}
              title="Save   "
              icon={{ type: "font-awesome", name: "save", color: "#fff" }}
              buttonStyle={styles.button}
              loading={this.state.isSubmitting}
              activityIndicatorStyle={{ color: "white" }}
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
    );
  }
}
export default Signup;
