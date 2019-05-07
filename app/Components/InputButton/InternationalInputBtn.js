import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

const InternationalInputButton = (props) => {
    const {
        buttonText,
        text,
        onChangeText,
        onPress,
        value } = props

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputInter}
                placeholder={text}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor={Colors.primaryGray}
                underlineColorAndroid='transparent'
                onChangeText={onChangeText}
                value={value}
                {...props} />

            <View style={styles.border} />
            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.InputButton}
            >
                <TouchableOpacity
                    onPress={onPress}>
                    <Text
                        style={styles.buttonText}
                    >
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    )
}

InternationalInputButton.propTypes = {
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

export default InternationalInputButton