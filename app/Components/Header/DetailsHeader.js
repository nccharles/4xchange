import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Dimensions, Image, TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles'

import { Colors } from '../../Assets/Themes'
import logout from '../../Assets/Icons/logout.png'
import user from '../../Assets/Icons/user.png'

const screenWidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

const DetailsHeader = (props) => {
  const { onPress1, onPress2, source } = props

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={onPress2}
          style={{
            marginHorizontal: 10,
            marginTop: 2
          }}>
          <MaterialIcons
            name='arrow-back'
            size={25}
            color='white' />
        </TouchableOpacity>
        <Text style={styles.title}>4xChange   </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPress1}>
            <Image
              source={source}
              style={styles.image1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

DetailsHeader.propTypes = {
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
  source1: PropTypes.any,
}

export default DetailsHeader;
