import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Colors } from '../../Assets/Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Moment from 'moment'
import "prop-types";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { GiftedChat } from 'react-native-gifted-chat';
import ChatsHeader from '../../Components/Header/ChatsHeader';
const screenwidth = Dimensions.get('window').width
class ForexChat extends Component {
    state = {
        loading: true,
        messages: [],
        lastseen: null,
        forexPhone: null,
        Customer: null,
        customerPhone: null,
        customerkey: null,
        unread: 0
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
                        console.log(resp)
                    })

            })
        firebase
            .database()
            .ref(`/Chats/${forexPhone}`)
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
                console.log(resp)
            })
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

                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
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