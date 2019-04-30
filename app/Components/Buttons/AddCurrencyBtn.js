import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native'
import { LinearGradient, Icon } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class AddButton extends Component {


    render() {

        const { onPress } = this.props

        return (

            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.chatbutton}
            >
                <TouchableOpacity
                    onPress={onPress}>
                    <Icon.Feather
                        name="plus-circle"
                        size={20}
                        color="white" />
                </TouchableOpacity>
            </LinearGradient>

        )
    }
}
AddButton.propTypes = {
    onPress: PropTypes.func,
}
export default AddButton