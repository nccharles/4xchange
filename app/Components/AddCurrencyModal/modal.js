import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Text, View, TouchableOpacity, Modal, TextInput, Image
} from 'react-native';
import { Icon, LinearGradient } from 'expo'
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class ModalComponent extends Component {
  render() {
    const {
      visible,
      onRequestClose,
      onPressBase,
      onPressQuote,
      baseCurrencyBtnTxt,
      quoteCurrencyBtnTxt,
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
          <LinearGradient
            colors={Colors.gradientColors}
            start={{ x: 0.5, y: 1.0 }}
            end={{ x: 1.0, y: 0 }}
            style={styles.container}>
            <View style={styles.currenciesbtn}>
              <TouchableOpacity
                onPress={onPressBase}
                style={styles.currencyBtn}>
                <Image style={styles.flag} resizeMode="stretch" source={this.props.baseFlag} />
                <Text style={styles.currencyBtnTxt}>
                  {baseCurrencyBtnTxt}
                </Text>
              </TouchableOpacity>
              <Icon.FontAwesome
                style={styles.exchange}
                name="exchange"
                size={20}
                color={Colors.primaryWhite} />
              <TouchableOpacity
                onPress={onPressQuote}
                style={styles.currencyBtn}>
                <Image style={styles.flag} resizeMode="stretch" source={this.props.quoteFlag} />
                <Text style={styles.currencyBtnTxt}>
                  {quoteCurrencyBtnTxt}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Buy: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Amount eg: 889"
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  autoCorrect={false}
                  placeholderTextColor={Colors.lightGray}
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
                  placeholderTextColor={Colors.lightGray}
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
                <Icon.Feather
                  name="x-circle"
                  size={25}
                  color={Colors.primaryWhite} />
                <Text style={styles.btnTxt}>Cancel   </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressAction}
                style={styles.button2}>
                <Icon.Feather
                  name={icon}
                  size={25}
                  color={Colors.primaryWhite} />
                <Text style={styles.btnTxt}>{actionBtnTxt}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
      </View>
    );
  }
}
ModalComponent.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onPressBase: PropTypes.func,
  onPressQuote: PropTypes.func,
  baseCurrencyBtnTxt: PropTypes.string,
  quoteCurrencyBtnTxt: PropTypes.string,
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
