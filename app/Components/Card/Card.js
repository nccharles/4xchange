import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import SVGImage from 'react-native-svg-image'

import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

import styles from './styles'

const Card = ({
    title,
    text,
    onPress,
    onPress1,
    style,
    source,
    text2,
    text3,
    baseCurrency,
    equivalent = 0,
    containerStyle,
    category,
    leftViewStyle,
    currency,
    bidPrice,
    askPrice,
    time,
    onPressIcon,
    iconStyle
}) => (
        <View style={{ flex: 1 }}>

            <View style={styles.row}>

                <View style={styles.wrapper}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={onPress1}>
                            <Text style={styles.boldLabel}>{text}</Text>
                            <Text style={styles.label}>Buy: {`${askPrice} ${''}`}</Text>
                            <Text style={styles.label2}>Sell: {`${bidPrice} ${''}`}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        style={styles.icon_btn}
                        onPress={onPressIcon}>
                    <Ionicons
                        name= "md-heart-outline"
                        color= {iconStyle}
                        size={23}
                        // style={iconStyle}
                    />
                </TouchableOpacity> */}
                    </View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={onPress}>
                            {/* <SVGImage
                                style={styles.flag_icon}
                                source={{ uri: source }}
                            /> */}
                            <Text style={styles.rightCategory}>{category}</Text>
                            <View style={styles.equivalentContainer}>
                                <Text style={styles.amount}>{`${equivalent.toFixed(2)}`}</Text>
                                <Text style={styles.currencyName}>{currency}</Text>
                            </View>
                            <Text style={styles.updated}>Updated {time}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.separator} />
        </View>
    );

Card.propTypes = {
    title: PropTypes.string,
    text3: PropTypes.string,
    text2: PropTypes.string,
    time: PropTypes.string,
    category: PropTypes.string,
    equivalent: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    onPress1: PropTypes.func,
    // source: PropTypes.any,
    containerStyle: PropTypes.any,
    leftViewStyle: PropTypes.any,
    currency: PropTypes.string,
    onPressIcon: PropTypes.func,
    iconStyle: PropTypes.string
};
export default Card;
