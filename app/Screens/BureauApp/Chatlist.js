import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    AsyncStorage, StyleSheet, Image
} from 'react-native';
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import Card from '../../Components/Card/ChatCard'
import styles from './Style/AddCurrencyStyle'

//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName } from '../../Config/constants';
import { registerForPushNotificationsAsync } from '../../Config/notice';
//back end done

const initialState = {
    loading: true,
    error: null,
    isSubmitting: false,
}

class Chatlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            data: [],
            loading: true,

            forexPhone: null,
            companyName: null,
            customerMessage: 0
        }
    };

    static navigationOptions = () => {
        let Title = 'Chats   '
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

    async componentDidMount() {

        const forexPhone = await AsyncStorage.getItem(userPhone)
        this.setState({
            companyName: await AsyncStorage.getItem(cName),
            forexPhone: forexPhone
        })
        this._getAllmessages(forexPhone)
        this._countCustomerMessages(forexPhone)
        registerForPushNotificationsAsync()
    }

    _countCustomerMessages = async (forexPhone) => {
        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .on('value', snapshot => {

                snapshot.forEach((child) => {
                    const customerMessage = child.val().countsent;
                    if (customerMessage) {
                        this.setState({

                            customerMessage: customerMessage
                        })
                    }
                })
            })
    }

    _getAllmessages = async (forexPhone) => {
        const that = this

        firebase.database().ref(`/Chats/${forexPhone}/Customer`)
            .orderByChild("unread")
            .on('value', snapshot => {
                let listData = []
                snapshot.forEach((child) => {
                    const customerPhone = child.val().customerPhone;
                    const name = child.val().name
                    const msg = child.val().countsent
                    const lastseen = child.val().timestamp
                    firebase.database().ref(`/Chats/${forexPhone}/all/${customerPhone}/messages`)
                        .limitToLast(1)
                        .orderByChild("createdAt")
                        .on('value', snapshot => {
                            if (snapshot.val()) {
                                snapshot.forEach((child) => {
                                    listData = [...listData, {
                                        _id: child.val()._d,
                                        count: msg,
                                        createdAt: child.val().createdAt,
                                        text: child.val().text,
                                        user: {
                                            _id: customerPhone,
                                            name: name,
                                            lastseen: lastseen,
                                            timestamp: child.val().user.timestamp
                                        }
                                    }]

                                })


                            }
                            that.setState(() => ({
                                data: [...listData],
                                loading: false,
                            }))
                        })
                })

            }
            )


    }

    //backend ends

    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }
    getStatus(lastseen) {
        const status = new Date().valueOf() - lastseen
        return status <= 60000 ? 'success' : 'error'
    }
    render() {
        const { loading } = this.state
        return (

            <View style={styles.container}>
                {this.state.data.length === 0 && !loading && (
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
                {loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View> :
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <Card
                                title={item.user.name}
                                subtitle={item.text}
                                hideAvatar={false}
                                roundAvatar={true}
                                avatar={item.user.name.substring(0, 1).toUpperCase()}
                                onPress={() => this.props.navigation.navigate('ForexChat', { customer: item.user.name, cPhone: item.user._id, forex: this.state.companyName, forexPhone: this.state.forexPhone })}
                                rightComponentText={Moment(item.user.timestamp).fromNow() + '   '}
                                value={item.count}
                                status="success"
                                status1={this.getStatus(item.user.lastseen)}
                            />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />}

            </View>
        );
    }
}

export default Chatlist