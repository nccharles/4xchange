import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const InputWithButton = (props) => {
    const {
        onPress,
        buttonText,
        text,
        onChangeText,
        value } = props

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder={text}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#99A3A4'
                underlineColorAndroid='transparent'
                onChangeText={onChangeText}
                value={value}
                {...props} />

            <View style={styles.border} />

            <TouchableOpacity
                style={styles.InputButton}
                onPress={onPress}>
                <Text
                    style={styles.buttonText}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    BtnStyle: PropTypes.any,
    BtnTextStyle: PropTypes.any,
    ButtonText: PropTypes.string,
    editable: PropTypes.bool,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.any
}

export default InputWithButton
