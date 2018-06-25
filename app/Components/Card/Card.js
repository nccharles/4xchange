import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

import styles from './styles'

const Card= ({
    title,
    text,
    onPress,
    style,
    source,
    text2,
    text3,
    baseCurrency,
    equivalent=0,
    containerStyle,
    category,
    leftViewStyle,
    currency,
    bidPrice,
    askPrice,
    time
}) => (

    <TouchableOpacity style={styles.row}
                      onPress={onPress}>
    {/* <View style={styles.left}/> */}
        <View style={styles.wrapper}>
            <View style={styles.leftContainer}>
                <Text style={styles.boldLabel}>{text}</Text>
                {/* <View style={styles.leftCategory}> */}
                    <Text style={styles.label}>Buy: {`${askPrice} ${''}`}</Text>
                    <Text style={styles.label2}>Sell: {`${bidPrice} ${''}`}</Text>
                {/* </View> */}
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.rightCategory}>{category}</Text>
                <View style={styles.equivalentContainer}>
                    <Text style={styles.amount}>{`${equivalent.toFixed(2)}`}</Text>
                    <Text style={styles.currencyName}>{currency}</Text>
                </View>
                <Text style={styles.updated}>Updated {time}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

Card.propTypes = {
    title: PropTypes.string,
    text3: PropTypes.string,
    text2: PropTypes.number,
    time: PropTypes.string,
    category: PropTypes.string,
    equivalent: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    source: PropTypes.number,
    containerStyle: PropTypes.any,
    leftViewStyle: PropTypes.any,
    currency: PropTypes.string,
    };
export default Card;
