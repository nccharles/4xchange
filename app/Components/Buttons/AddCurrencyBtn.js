import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

class AddButton extends Component {


  render () {

    const {onPress} = this.props

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.button}>
            <Feather 
                name="plus-circle"
                size={20}
                color="white"/>
            <Text 
                style={styles.buttonText}>
                Add currencies
            </Text>
        </TouchableOpacity>
    )
  }
}
AddButton.propTypes = {
    onPress: PropTypes.func,
}
export default AddButton