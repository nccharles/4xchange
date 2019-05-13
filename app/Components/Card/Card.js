import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
// import { Badge } from 'react-native-elements'
import styles from './styles'

const Card = ({
    text,
    onPress,
    onPress1,
    equivalent = 0,
    category,
    currency,
    bidPrice,
    askPrice,
    time
}) => (
        <View style={{ flex: 1 }}>

            <View style={styles.row}>

                <View style={styles.wrapper}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={onPress1}>
                            <Text style={styles.boldLabel}>{text}</Text>
                            <Text style={styles.label}>Buy: {`${askPrice}`}</Text>
                            <Text style={styles.label2}>Sell: {`${bidPrice}`}</Text>
                        </TouchableOpacity>
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
