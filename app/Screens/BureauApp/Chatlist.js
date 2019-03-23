import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import Card from '../../Components/Card/ChatCard'
import styles from './Style/AddCurrencyStyle'

//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName } from '../../Config/constants';
//back end done

const initailState = {
    loading: true,
    error: null,
    isSubmitting: false,
}

class AddCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initailState,
            data: [],
            loading: true,

            forexPhone: null,
            companyName: null,
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
    async componentWillMount() {
        const forexPhone = await AsyncStorage.getItem(userPhone)
        console.log(forexPhone)
        this.setState({
            // companyName: currentUser.infos.businessInfo.displayName,
            companyName: await AsyncStorage.getItem(cName),
            forexPhone: forexPhone
        })
        this._getAllmessages(forexPhone)
    }

    //backend start
    _getAllmessages = async (forexPhone) => {
        const that = this
        await firebase.database().ref(`/Chats/${forexPhone}`)
            .once('value').then(snapshot => {
                this.setState(() => ({
                    loading: false,
                }))
                console.log(snapshot)
                if (snapshot.val()) {
                    that.setState(() => ({
                        data: snapshot.val().messages,
                        loading: false,
                    }))
                }
            })
            // console.log(this.state.data)
            .catch(err => {
                console.log(err)
            });
    }

    //backend ends

    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }
    getTime = (timestamp) => {
        let currentDate = new Date(timestamp);

        let date = currentDate.getDate();
        let month = currentDate.getMonth(); //Be careful! January is 0 not 1
        let year = currentDate.getFullYear();

        let dateString = date + "/" + (month + 1) + "/" + year;
        return dateString
    }
    render() {
        const { loading } = this.state
        return (
            <View style={styles.container}>
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
                                onPress={() => this.props.navigation.navigate('ForexChat', { customer: item.user.name, forex: this.state.companyName, forexPhone: this.state.forexPhone })}
                                rightComponentText={this.getTime(item.user.timestamp)}
                            />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />}

            </View>
        );
    }
}

export default AddCurrency