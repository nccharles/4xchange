import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import styles from './styles'

class ChatCard extends Component {

    static propTypes = {
        hideAvatar: PropTypes.bool,
        roundAvatar: PropTypes.bool,
        avatar: Image.propTypes.source,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        onPress: PropTypes.func,
        rightComponentText: PropTypes.string
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <TouchableOpacity style={styles.parent} onPress={this.props.onPress}>
                    {/* <View style={styles.imageChatContainer}>
                        <Image style={styles.leftCircle} resizeMode="stretch" source={this.props.avatar} />
                    </View> */}
                    <View style={styles.imageChatContainer}>
                        <Text style={styles.leftCircle}>{this.props.avatar}</Text>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.subTitleContainer} >
                            <Text style={styles.subTitle}>
                                {this.props.subtitle}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.right} >
                        <Text style={styles.amount} >
                            {this.props.rightComponentText ? this.props.rightComponentText.toString()
                                : null
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.Chatseparator} />
            </View>
        );
    }
}

export default ChatCard;