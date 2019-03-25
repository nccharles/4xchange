import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Colors } from '../../Assets/Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import "prop-types";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { GiftedChat } from 'react-native-gifted-chat';
class ForexChat extends Component {

    static navigationOptions = ({ navigation }) => {
        let Title = (navigation.state.params || {}).customer || 'Chat!   '
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
    state = {
        loading: true,
        messages: [],
        forexPhone: null,
        Customer: null,
        customerPhone: null
    }
    onSend(messages = [], forexPhone, customerPhone) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
        firebase
            .database()
            .ref(`/Chats/${forexPhone}/all/${customerPhone}`)
            .update({
                messages: GiftedChat.append(this.state.messages, messages),
            })
            .then(resp => {
                console.log(resp)
            })
        // this._getAllmessages(forexPhone)
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
        const customerPhone = cPhone.replace('c', '')
        this.setState({
            forexPhone: forexPhone,
            Customer: customer,
            customerPhone: customerPhone
        })
        this._getAllmessages(forexPhone)
    }
    _getAllmessages = async (forexPhone) => {
        const that = this
        await firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .on('value', snapshot => {

                firebase.database().ref(`/Chats/${forexPhone}/all/${snapshot.val().customerPhone}`)
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
export default ForexChat;