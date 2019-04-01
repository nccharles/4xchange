import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Colors } from '../../Assets/Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons'
import Moment from 'moment'
import "prop-types";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { GiftedChat, Send, Bubble, SystemMessage } from 'react-native-gifted-chat';
import CustomActions from '../../Components/Customs/Actions';
import CustomView from '../../Components/Actions/CustomView';
import ChatsHeader from '../../Components/Header/ChatsHeader';
const screenwidth = Dimensions.get('window').width
class ForexChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            messages: [],
            lastseen: null,
            forexPhone: null,
            Customer: null,
            customerPhone: null,
            customerkey: null,
            unread: 0
        }
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }
    onSend(messages = [], forexPhone, customerPhone) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .orderByChild(`customerPhone`)
            .equalTo(customerPhone)
            .once('value').then(snapshot => {
                snapshot.forEach((child) => {
                    this.setState({
                        customerkey: child.key,
                        unread: child.val().unread
                    })
                })
                let newunread = this.state.unread + 1
                firebase
                    .database()
                    .ref(`/Chats/${forexPhone}/Customer/${this.state.customerkey}`)
                    .update({
                        customerPhone: customerPhone,
                        countsent: 0,
                        unread: newunread,
                    })
                    .then(resp => {
                        console.log("Done")
                    })

            })
        firebase
            .database()
            .ref(`/infos/${forexPhone}/publicInfo`)
            .update({
                timestamp: this.timestamp
            })
        firebase
            .database()
            .ref(`/Chats/${forexPhone}/all/${customerPhone}`)
            .update({
                messages: GiftedChat.append(this.state.messages, messages),
            })
            .then(resp => {
                console.log("Done")
            })
    }
    renderSend(props) {
        return (
            <Send
                {...props}
            >

                <View style={{ marginRight: 10, marginBottom: 5 }}>
                    <MaterialIcons
                        name="send"
                        size={30}
                        color={Colors.primary} />
                </View>
            </Send>
        );
    }
    componentWillMount() {
        this._isMounted = true;
        const { forexPhone, customer, cPhone } = this.props.navigation.state.params
        const customerPhone = cPhone
        this.setState({
            forexPhone: forexPhone,
            Customer: customer,
            customerPhone: customerPhone
        })
        this._getAllmessages(forexPhone, customerPhone)
        this._getCustomerLastseen(forexPhone, customerPhone)
    }

    _getCustomerLastseen = async (forexPhone, customerPhone) => {
        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .orderByChild(`customerPhone`)
            .equalTo(customerPhone)
            .on('value', snapshot => {
                snapshot.forEach((child) => {
                    const lastseen = child.val().timestamp;
                    if (lastseen) {
                        this.setState({
                            lastseen: lastseen
                        })
                    }
                })
            })
    }
    getLastseen(lastseen) {
        const status = this.timestamp - lastseen
        return status <= 60000 ? 'online' : 'offline'
    }
    _getAllmessages = async (forexPhone, customerPhone) => {
        const that = this
        firebase.database().ref(`/Chats/${forexPhone}/all/${customerPhone}`)
            .on('value', snapshot => {
                this.setState(() => ({
                    loading: false,
                }))
                console.log(snapshot)
                if (snapshot.val()) {
                    that.setState(() => ({
                        messages: snapshot.val().messages,
                        loading: false,
                    }))
                }
            })

    }

    get user() {
        return {
            name: this.props.navigation.state.params.forex,
            _id: 'f' + this.state.forexPhone,
            timestamp: this.timestamp
        };
    }
    get timestamp() {
        return new Date().valueOf();
    }
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, this.state.messages),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }
    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => { },
        };
        return (
            <CustomActions
                {...props}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }
    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }
    render() {
        const { loading } = this.state
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            )
        }
        return (
            <>
                <ChatsHeader
                    onPress1={() => this.props.navigation.goBack()}
                    customer={(this.props.navigation.state.params || {}).customer || 'Customer   '}
                    status={this.getLastseen(this.state.lastseen) === 'offline' ? "last seen " + Moment(this.state.lastseen).fromNow() + '   ' : "online   "} />
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
                    onSend={messages => this.onSend(messages, this.state.forexPhone, this.state.customerPhone)}
                    renderCustomView={this.renderCustomView}
                    user={this.user}
                    scrollToBottom={true}
                    isAnimated={true}
                    renderSend={this.renderSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderCustomView={this.renderCustomView}
                />
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={screenwidth / 24} />
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
export default ForexChat;