import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class AddButton extends Component {


    render() {

        const { onPress } = this.props

        return (
            <TouchableOpacity
                onPress={onPress}>
                <LinearGradient
                    colors={Colors.gradientColors}
                    start={{ x: 1.0, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    style={styles.button}
                >

                    <Feather
                        name="plus-circle"
                        size={20}
                        color="white" />
                    <Text
                        style={styles.buttonText}>
                        Add currencies
            </Text>

                </LinearGradient>
            </TouchableOpacity>
        )
    }
}
AddButton.propTypes = {
    onPress: PropTypes.func,
}
export default AddButton