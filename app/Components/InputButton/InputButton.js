import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

const InputWithButton = (props) => {
    const {
        onPress,
        baseText,
        quoteText,
        text,
        onChangeText,
        value } = props

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.baseButton}
            >
                <TouchableOpacity
                    onPress={onPress}>
                    <Text
                        style={styles.buttonText}
                    >
                        {baseText}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
            <TextInput
                style={styles.input}
                placeholder={text}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor={Colors.primaryGray}
                underlineColorAndroid='transparent'
                onChangeText={onChangeText}
                value={value}
                {...props} />

            {/* <View style={styles.border} /> */}
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.quoteButton}
            >
                <TouchableOpacity
                    onPress={onPress}>
                    <Text
                        style={styles.buttonText}
                    >
                        {quoteText}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    BtnStyle: PropTypes.any,
    BtnTextStyle: PropTypes.any,
    baseText: PropTypes.string,
    quoteText: PropTypes.string,
    editable: PropTypes.bool,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.any
}

export default InputWithButton
