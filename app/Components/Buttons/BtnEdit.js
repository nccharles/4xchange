import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { LinearGradient, Icon } from "expo";
import styles from './styles'
import { Colors } from '../../Assets/Themes';

class EditButton extends Component {

    componentName = "GradientButton";
    typeMapping = {
        button: {},
        gradient: {},
        text: {}
    };
    render() {
        const { onPress, value, status } = this.props

        return (


            <LinearGradient
                colors={Colors.gradientColors}
                start={{ x: 1.0, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.chatbutton}
            ><TouchableOpacity
                onPress={onPress}>
                    <Icon.MaterialCommunityIcons
                        name="account-edit"
                        size={30}
                        color="white" />

                </TouchableOpacity>
            </LinearGradient>
        )
    }
}
EditButton.propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.number,
    status: PropTypes.string
}
export default EditButton