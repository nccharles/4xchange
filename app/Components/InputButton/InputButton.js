import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient, Icon } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

const InputWithButton = (props) => {
    const {
        onPressBase,
        onPressQuote,
        baseText,
        quoteText,
        text,
        baseFlag,
        quoteFlag,
        onChangeText,
        value } = props

    return (
        <View style={styles.Localcontainer}>
            <View style={styles.currencyBtn}>
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 1.0, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    style={styles.Linear}
                >
                    <TouchableOpacity
                        style={styles.Buttons}
                        onPress={onPressBase}>
                        <Image style={styles.flag} resizeMode="stretch" source={baseFlag} />
                        <Text style={styles.buttonText} >
                            {baseText}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Icon.FontAwesome
                    style={styles.exchange}
                    name="exchange"
                    size={20}
                    color={Colors.primaryWhite} />
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 1.0, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    style={styles.Linear}

                >
                    <TouchableOpacity
                        style={styles.Buttons}
                        onPress={onPressQuote}>
                        <Image style={styles.flag} resizeMode="stretch" source={quoteFlag} />
                        <Text
                            style={styles.buttonText}
                        >
                            {quoteText}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <TextInput
                style={styles.input}
                placeholder={text}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor={Colors.primaryWhite}
                underlineColorAndroid='transparent'
                onChangeText={onChangeText}
                value={value}
                {...props} />
        </View>
    )
}

InputWithButton.propTypes = {
    onPressBase: PropTypes.func,
    onPressQuote: PropTypes.func,
    BtnStyle: PropTypes.any,
    BtnTextStyle: PropTypes.any,
    baseFlag: PropTypes.object,
    quoteFlag: PropTypes.object,
    baseText: PropTypes.string,
    quoteText: PropTypes.string,
    editable: PropTypes.bool,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.any
}

export default InputWithButton
