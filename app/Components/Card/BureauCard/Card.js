import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { View, SectionList, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import styles from './styles'


const Card =(props) => {
    const {onPress, onPressDel, category, currency, text, askPrice, bidPrice, time} = props
    return (
      <View style={styles.container}>

      {/* <View style={styles.left}/> */}
        
        <TouchableOpacity 
              onPress={onPress}
              style={styles.row}>
          {/* <View style={styles.leftContainer}> */}
                <Text style={styles.boldLabel}>{text}</Text>
                <View style={{
                    position: 'absolute',
                    left: 15,
                    bottom: 5
                }}>
                    <Text style={styles.label}>Buy: {askPrice}</Text>
                    <Text style={styles.label}>Sell: {bidPrice}</Text>
                </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={onPressDel}
            style={styles.iconBtn}>
          <Ionicons  
              name='ios-trash' 
              size={30} 
              color='#E74C3C'
              // color="white"
              />
        </TouchableOpacity>
        <Text style={styles.updated}>Updated {time}</Text>
      </View>
    )
}
Card.propTypes = {
    onPress: PropTypes.func,
    onPressDel: PropTypes.func,
    category: PropTypes.string,
    currency: PropTypes.string,
    text: PropTypes.string,
    askPrice: PropTypes.string,
    bidPrice: PropTypes.string,
    time: PropTypes.string,
}
export default Card