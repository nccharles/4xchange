import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../Assets/Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import "prop-types";
// 1.
import { GiftedChat } from 'react-native-gifted-chat';
class Chat extends React.Component {
    // 2.

    static navigationOptions = ({ navigation }) => {
        let Title = (navigation.state.params || {}).forex || 'Chat!   '
        return {
            headerTitle: Title + '   ',
            headerStyle: {
                backgroundColor: Colors.primary,
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    // 3.
    state = {
        messages: [],
        Customer: this.props.navigation.state.params.customer
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    renderCustomView = (props) => {
        if (props.currentMessage.location) {
            return (
                <View style={props.containerStyle}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={[styles.mapView]}
                        region={{
                            latitude: props.currentMessage.location.latitude,
                            longitude: props.currentMessage.location.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: props.currentMessage.location.latitude,
                                longitude: props.currentMessage.location.longitude
                            }}
                        />
                    </MapView>
                </View>
            );
        }
        return null
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello ${this.state.Customer}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'ForexBureau',
                        avatar: 'http://www.gtforex.co.uk/Content/images/trading.png',
                    },
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJ4o7EejFSJT1ZLsWGQEReOj1HTrom2kOtbh46jctmKV7DT_Cpg',

                },

            ],
        })
    }

    render() {
        // 4.
        return (
            <>
                {this.state.messages.length === 0 && (
                    <View style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 50
                        }]}>
                        <Image
                            source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                )}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    renderCustomView={this.renderCustomView}
                    user={{
                        _id: 1,
                    }}
                    scrollToBottom={true}
                    isAnimated={true}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
                />
            </>
        );
    }
}
const styles = StyleSheet.create({
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});
export default Chat;