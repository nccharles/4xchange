import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Colors } from '../../Assets/Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import "prop-types";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { GiftedChat } from 'react-native-gifted-chat';
import { chatName, chatNum } from '../../Config/constants';
import ChatsHeader from '../../Components/Header/ChatsHeader';
class Chat extends React.Component {
    state = {
        loading: true,
        messages: [],
        customerPhone: null,
        forexPhone: null,
        Customer: null
    }
    onSend(messages = [], forexPhone, Customer, customerPhone) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .orderByChild(`name`)
            .equalTo(Customer)
            .once('value').then(snapshot => {
                console.log(snapshot.val())
                if (snapshot.val() === null) {
                    firebase
                        .database()
                        .ref(`/Chats/${forexPhone}/Customer`)
                        .push({
                            name: Customer,
                            customerPhone: customerPhone
                        })
                        .then(resp => {
                            console.log(resp)
                        })
                }
            })
        console.log(this.state.messages)
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
    async componentWillMount() {
        const Name = await AsyncStorage.getItem(chatName)
        const Num = await AsyncStorage.getItem(chatNum)
        const { forexPhone } = this.props.navigation.state.params
        this.setState({
            forexPhone: forexPhone,
            Customer: Name,
            customerPhone: Num
        })
        this._getAllmessages(forexPhone, Num)
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
                customer={(this.props.navigation.state.params || {}).forex || 'ForexBureau   '}
                status="online" />
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
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
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