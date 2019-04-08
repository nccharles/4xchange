import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Platform, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Colors } from '../../Assets/Themes'
import "prop-types";
import Moment from 'moment'
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { MaterialIcons } from '@expo/vector-icons'
import { GiftedChat, Send, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';
import { chatName, chatNum } from '../../Config/constants';
import ChatsHeader from '../../Components/Header/ChatsHeader';
import CustomActions from '../../Components/Customs/Actions';
import CustomView from '../../Components/Customs/CustomView';
import { sendPushNotification, registerForPushNotificationsAsync } from '../../Config/notice';
const screenwidth = Dimensions.get('window').width
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            messages: [],
            customerPhone: null,
            forexPhone: null,
            Customer: null,
            customerkey: null,
            // loadEarlier: true,
            // isLoadingEarlier: false,
            sent: 0,
            lastseen: 0

        }
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }
    onSend(messages = [], forexPhone, Customer, customerPhone) {
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
                        sent: child.val().countsent
                    })
                })
                const updateAt = this.timestamp
                if (snapshot.val() === null) {
                    firebase
                        .database()
                        .ref(`/Chats/${forexPhone}/Customer`)
                        .push({
                            name: Customer,
                            customerPhone: customerPhone,
                            timestamp: updateAt,
                            countsent: this.state.sent,
                            unread: 0,
                        })
                        .then(resp => {
                            console.log('Done')
                        })
                } else {
                    let newsent = this.state.sent + 1
                    firebase
                        .database()
                        .ref(`/Chats/${forexPhone}/Customer/${this.state.customerkey}`)
                        .update({
                            name: Customer,
                            customerPhone: customerPhone,
                            timestamp: updateAt,
                            countsent: newsent,
                            unread: 0,
                        })
                        .then(resp => {
                            console.log('Done')
                        })
                }
            })

        firebase
            .database()
            .ref(`/Chats/${forexPhone}/all/${customerPhone}`)
            .update({
                messages: GiftedChat.append(this.state.messages, messages),
            })
            .then(resp => {
                console.log('Done')
            })
        messages.forEach(child => {
            console.log("message" + child.text)
            sendPushNotification(child.user.name, forexPhone, child.text)
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

    async componentWillMount() {
        this._isMounted = true;
        const Name = await AsyncStorage.getItem(chatName)
        const Num = await AsyncStorage.getItem(chatNum)
        const { forexPhone } = this.props.navigation.state.params
        this.setState({
            forexPhone: forexPhone,
            Customer: Name,
            customerPhone: Num
        })
        this._getForexLastseen(forexPhone)
        this._getAllmessages(forexPhone, Num)
        this._interval = setInterval(() => {
            this._getStatus(forexPhone, Name, Num)
        }, 5000);
        registerForPushNotificationsAsync()
    }

    _getForexLastseen = async (forexPhone) => {
        firebase.database().ref(`/infos/${forexPhone}/publicInfo`)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    this.setState({
                        lastseen: snapshot.val().timestamp
                    })
                }
            })
    }
    getLastseen(lastseen) {
        const status = this.timestamp - lastseen
        return status <= 59000 ? 'online' : 'offline'
    }
    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this._interval);
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
                        backgroundColor: Colors.silver,
                    },
                    right: {
                        backgroundColor: Colors.primary,
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
    _getStatus = (forexPhone, Customer, customerPhone) => {
        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .orderByChild(`customerPhone`)
            .equalTo(customerPhone)
            .once('value').then(snapshot => {
                snapshot.forEach((child) => {
                    console.log(child.val().countsent)
                    this.setState({
                        customerkey: child.key,
                        sent: child.val().countsent
                    })
                })
                const updateAt = this.timestamp
                if (snapshot.val() === null) {
                    firebase
                        .database()
                        .ref(`/Chats/${forexPhone}/Customer`)
                        .push({
                            name: Customer,
                            customerPhone: customerPhone,
                            timestamp: updateAt,
                            countsent: this.state.sent,
                            unread: 0,
                        })
                        .then(resp => {
                            console.log('Done')
                        })
                } else {
                    let newsent = this.state.sent
                    firebase
                        .database()
                        .ref(`/Chats/${forexPhone}/Customer/${this.state.customerkey}`)
                        .update({
                            name: this.state.Customer,
                            customerPhone: customerPhone,
                            timestamp: updateAt,
                            countsent: newsent,
                            unread: 0,
                        })
                        .then(resp => {
                            console.log('Done')
                        })
                }


            })
    }
    _getAllmessages = async (forexPhone, customerPhone) => {
        const that = this

        await firebase.database().ref(`/Chats/${forexPhone}/all/${customerPhone}/messages`)
            .on('value', snapshot => {
                if (snapshot.val()) {
                    that.setState(() => ({
                        messages: snapshot.val(),
                        loading: false,
                    }))
                }
                this.setState(() => ({
                    loading: false,
                }))
            })
    }
    get user() {
        return {
            name: this.state.Customer,
            _id: 'c' + this.state.customerPhone,
            timestamp: this.timestamp
        };
    }
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
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
            <><ChatsHeader
                onPress1={() => this.props.navigation.goBack()}
                customer={(this.props.navigation.state.params || {}).forex + '   ' || 'ForexBureau   '}
                status={(this.state.lastseen === 0 ? '' : (this.getLastseen(this.state.lastseen) === 'offline' ? "last seen " + Moment(this.state.lastseen).fromNow() + '   ' : "online  "))} />
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
                    onSend={messages => this.onSend(messages, this.state.forexPhone, this.state.Customer, this.state.customerPhone)}
                    user={this.user}
                    scrollToBottom={true}
                    isAnimated={true}
                    // onLongPress={(messages) => this.onLongPress(messages)}
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
export default Chat;