import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';

import styles from './styles'


const Header = (props) => {
  const { onPress1, onPress2, source1, source2 } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>4xChange    </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPress1}
            style={styles.button}>
            <Image
              source={source1}
              style={styles.image1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress2}>
            <Image
              source={source2}
              style={styles.image2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

Header.propTypes = {
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
  source1: PropTypes.any,
  source2: PropTypes.any
}

export default Header;
