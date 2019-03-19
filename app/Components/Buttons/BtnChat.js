import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

class ChatButton extends Component {


    render() {

        const { onPress } = this.props

        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.chatbutton}>
                <Feather
                    name="message-circle"
                    size={30}
                    color="white" />
            </TouchableOpacity>
        )
    }
}
ChatButton.propTypes = {
    onPress: PropTypes.func,
}
export default ChatButton