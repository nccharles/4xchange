import React from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native';

import styles from './styles'

const Header = (props) => {
    const {
        onPress,
        source } = props

    return (
        <TouchableOpacity
            style={styles.headerBtn}
            onPress={onPress}>
            <Image
                source={source}
                style={styles.headerImg} />
        </TouchableOpacity>
    );
}

Header.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.any,
}


export default Header