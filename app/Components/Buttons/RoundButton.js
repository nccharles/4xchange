import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const RoundButton = (props) => {
    const { onPress, source } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.roundButton}>
            <Image
                source={source}
                style={styles.image} />
        </TouchableOpacity>
    )
}

RoundButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.any,
}

export default RoundButton