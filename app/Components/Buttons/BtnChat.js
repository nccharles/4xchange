import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

class ChatButton extends Component {


    render() {

        const { onPress, value, status } = this.props

        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.chatbutton}>
                <Feather
                    name="message-circle"
                    size={30}
                    color="white" />
                {value === 0 ? null : <Badge
                    value={value}
                    status={status}
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />}
            </TouchableOpacity>
        )
    }
}
ChatButton.propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.number,
    status: PropTypes.string
}
export default ChatButton