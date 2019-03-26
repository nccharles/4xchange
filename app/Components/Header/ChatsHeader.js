import React from 'react';
import PropTypes from 'prop-types'
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles'

const ChatsHeader = (props) => {
    const { onPress1, status, customer } = props

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={onPress1}
                    style={{
                        marginHorizontal: 10,
                        marginTop: 2
                    }}>
                    <MaterialIcons
                        name='arrow-back'
                        size={25}
                        color='white' />
                </TouchableOpacity>
                <View style={styles.ChatStatus}>
                    <Text style={styles.chattitle}>{customer}   </Text>
                    <Text style={styles.StatusText}>{status}</Text>
                </View>
            </View>
        </View>
    );
}

ChatsHeader.propTypes = {
    onPress1: PropTypes.func,
    status: PropTypes.string,
    customer: PropTypes.string,
}

export default ChatsHeader;
