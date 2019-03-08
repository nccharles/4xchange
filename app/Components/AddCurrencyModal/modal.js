import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
  FlatList, Image, Animated, ActivityIndicator, Dimensions,
  SectionList, Modal, TextInput
} from 'react-native';
// import Dialog from "react-native-dialog";
import { Feather } from '@expo/vector-icons'

// import { Colors } from '../../Assets/Themes'

import styles from './styles'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

class ModalComponent extends Component {
  render() {
    const {
      visible,
      onRequestClose,
      onPressCurrency,
      baseCurrencyBtnTxt,
      onChangeTextBuy,
      valueBuy,
      onChangeTextSell,
      valueSell,
      onPressCancel,
      onPressAction,
      actionBtnTxt,
      errorMessage,
      icon
    } = this.props
    return (
      <View>
        <Modal
          visible={visible}
          transparent={false}
          animationType={"slide"}
          onRequestClose={onRequestClose}
        // onShow={()=> this.setBaseCurrency(this.state.Alert_Visibility)}
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={onPressCurrency}
              style={styles.currencyBtn}>
              <Text style={styles.currencyBtnTxt}>
                {baseCurrencyBtnTxt}
              </Text>
            </TouchableOpacity>
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Buy: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Amount eg: 889"
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  placeholderTextColor='#99A3A4'
                  underlineColorAndroid='transparent'
                  onChangeText={onChangeTextBuy}
                  value={valueBuy}
                  keyboardType="numeric"
                // {...props}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.inputTitle}>Sell: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Amount eg: 889"
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  placeholderTextColor='#99A3A4'
                  underlineColorAndroid='transparent'
                  onChangeText={onChangeTextSell}
                  value={valueSell}
                  keyboardType="numeric"
                // {...props}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>{errorMessage}</Text>
              <TouchableOpacity
                onPress={onPressCancel}
                style={styles.button}>
                <Feather
                  name="x-circle"
                  size={25}
                  color="white" />
                <Text style={styles.btnTxt}>Cancel   </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressAction}
                style={styles.button2}>
                <Feather
                  name={icon}
                  size={25}
                  color="white" />
                <Text style={styles.btnTxt}>{actionBtnTxt}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
ModalComponent.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onPressCurrency: PropTypes.func,
  baseCurrencyBtnTxt: PropTypes.string,
  onChangeTextBuy: PropTypes.func,
  valueBuy: PropTypes.any,
  onChangeTextSell: PropTypes.func,
  valueSell: PropTypes.any,
  onPressCancel: PropTypes.func,
  onPressAction: PropTypes.func,
  actionBtnTxt: PropTypes.string,
  errorMessage: PropTypes.string,
  icon: PropTypes.any
}

export default ModalComponent
