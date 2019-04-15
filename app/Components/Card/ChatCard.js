import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-native-elements'
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import styles from './styles'
const colors = [
    '#7FB3D5', '#006442', '#B53471', '#5758BB', '#EB9CA8', '#48dbfb',
    '#8A004F', '#C4E538', '#1dd1a1', '#00a3e1', '#9980FA'
]
class ChatCard extends Component {

    static propTypes = {
        hideAvatar: PropTypes.bool,
        roundAvatar: PropTypes.bool,
        avatar: Image.propTypes.source,
        title: PropTypes.string,
        status: PropTypes.string,
        status1: PropTypes.string,
        value: PropTypes.number,
        subtitle: PropTypes.string,
        onPress: PropTypes.func,
        rightComponentText: PropTypes.string
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <TouchableOpacity style={styles.parent} onPress={this.props.onPress}>
                    <View style={[styles.imageChatContainer, { backgroundColor: colors[Math.floor(Math.random() * colors.length)] }]}>
                        <Text style={styles.leftCircle}>{this.props.avatar}</Text>
                        <Badge
                            status={this.props.status1}
                            containerStyle={{ position: 'absolute', top: -2, right: 1 }}
                        />
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
                        <Text style={styles.time} >
                            {this.props.rightComponentText ? this.props.rightComponentText.toString()
                                : null
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.props.value === 0 ? null : <Badge
                    value={this.props.value}
                    status={this.props.status}
                    containerStyle={styles.message}
                />}
                <View style={styles.Chatseparator} />
            </View>
        );
    }
}

export default ChatCard;