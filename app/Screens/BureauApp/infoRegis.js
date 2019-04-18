import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView, AsyncStorage

} from "react-native";
import { LinearGradient } from 'expo';
import { Button, Input } from "react-native-elements";
import { userPhone, cName, forexCountry } from '../../Config/constants'
import styles from "./Style/SignupStyles";
import { Colors } from "../../Assets/Themes";
//backend things
import * as firebase from "firebase";

class InfoRegis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentails: {
        tinNumber: null,
        licenceNumber: null,
        email: null,
        companyName: null
      },
      countries: null,
      isSubmitting: false,
      errs: {
        tinNumber: null
      }
      //    isLoading: false,
    };
  }
  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: 'Forex Info   ',
      headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0,
      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Lucida-Grande',
      },
    }
  };


  async componentDidMount() {
    this.setState({
      userPhone: await AsyncStorage.getItem(userPhone),
      countryName: await AsyncStorage.getItem(forexCountry)
    });
    this._queryExistingRegInfo();
  }
  _queryExistingRegInfo = () => {
    const { userPhone } = this.state;
    firebase
      .database()
      .ref(`/infos/${userPhone}/businessInfo`)
      .once("value")
      .then(sanpshot => {
        this.setState({
          credentails: {
            ...this.state.credentails,
            ...sanpshot.val()
          }
        });
      })
      .catch(error => {
        console.log(error.message);
      });
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

  _handleInput = (key, value) => {
    this.setState(state => ({
      credentails: {
        ...state.credentails,
        [key]: value
      }
    }));
  };

  _handleSignUp = async () => {
    const {
      credentails: { tinNumber, licenceNumber, email, companyName },
      userPhone,
      errs,
      isSubmitting,
      countryName,
    } = this.state;
    await AsyncStorage.setItem(cName, companyName)
    if (isSubmitting) {
      return;
    }
    const that = this;
    this.setState({
      isSubmitting: true
    });
    if (tinNumber.length < 9) {
      this.setState({
        isSubmitting: false,
        errs: {
          tinNumber: "Invalid tin number"
        }
      });
    }
    firebase
      .database()
      .ref(`/infos/${userPhone}/businessInfo`)
      .set({
        tinNumber,
        licenceNumber,
        companyName,
        userPhone,
        email,
        completed: true,
        isSubmitting: false,
        countryName,
      })
      .then(resp => {
        that.setState({
          errors: {
            tinNumber: null
          },
          isSubmitting: false
        });
        firebase
          .database()
          .ref(`/infos/${userPhone}/businessInfo`).update({
            displayName: companyName,
            email,
            userPhone,
            countryName,
          })
          .then(resp => {
            that.props.navigation.navigate("AdditionalInfo", {
              userPhone,
              email,
              companyName,
              countryName,
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  //backend end

  render() {
    return (
      <View
        onResponderRelease={event => {
          Keyboard.dismiss();
        }}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={30}
        >
          <ScrollView>
            <Input
              placeholder="Company name"
              leftIcon={{
                type: "material-community",
                name: "city",
                color: Colors.primary
              }}
              containerStyle={styles.input}
              underlineColorAndroid={"transparent"}
              inputStyle={styles.inputStyle}
              autoCorrect={false}
              returnKeyType={"next"}
              onChangeText={input => this._handleInput("companyName", input)}
              value={this.state.credentails.companyName}
            />
            <Input
              placeholder="TIN number"
              leftIcon={{
                type: "foundation",
                name: "database",
                color: Colors.primary
              }}
              keyboardType='numeric'
              containerStyle={styles.input}
              underlineColorAndroid={"transparent"}
              inputStyle={styles.inputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={"next"}
              onChangeText={input => this._handleInput("tinNumber", input)}
              value={this.state.credentails.tinNumber}
            />
            <Input
              placeholder='Email'
              leftIcon={{ type: 'entypo', name: 'email', color: Colors.primary }}
              containerStyle={styles.input}
              underlineColorAndroid={'transparent'}
              inputStyle={styles.inputStyle}
              autoCapitalize='none'
              keyboardType='email-address'
              autoCorrect={false}
              returnKeyType={"next"}
              onChangeText={(input) => this._handleInput('email', input)}
              value={this.state.credentails.email}
              editable={true}
            />
            <LinearGradient
              colors={Colors.gradientColors}
              start={{ x: 1.0, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.button}
            >
              <Button
                onPress={this._handleSignUp.bind(this)}
                title="Add   "
                icon={{
                  type: "material-community",
                  name: "account-plus-outline",
                  color: "#fff"
                }}
                loading={this.state.isSubmitting}
                disabled={this.state.isSubmitting}
                disabledStyle={styles.button}
                activityIndicatorStyle={{ color: "white" }}
              />
            </LinearGradient>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default InfoRegis;
