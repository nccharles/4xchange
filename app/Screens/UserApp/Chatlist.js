import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator, AsyncStorage, StyleSheet, Image
} from 'react-native';
import { Colors } from '../../Assets/Themes'
import Card from '../../Components/Card/ChatCard'
import styles from '../BureauApp/Style/AddCurrencyStyle'
//backend imports 
import * as firebase from 'firebase'
import _ from 'lodash'
import { chatName, chatNum } from '../../Config/constants';
import NameDialogComponent from '../../Components/NameModal/Usermodal';
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
            InputDialogVisible: false,
            chatname: null,
            inputedValue: '',
            companyName: '',
            data: [],
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

    async componentWillMount() {
        this._getAllCustomers()
    }

    _getAllCustomers = async () => {
        const that = this
        await firebase.database().ref('/infos/').on('value', snapshot => {
            const Infos = _.map(snapshot.val(), (val, uid) => {
                return { ...val.publicInfo, uid }
            })
            if (Infos) {
                that.setState({
                    data: [...Infos],
                    loading: false,
                })
            }
        })
    }


    //backend ends

    keyExtractor = (index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }
    handleCustomer = async (companyName, userPhone) => {
        const Num = await AsyncStorage.getItem(chatNum)
        if (Num) {
            this.props.navigation.navigate("Chat", { forex: companyName, forexPhone: userPhone })
        } else {
            this.setState({
                companyName: companyName,
                phone: userPhone,
                InputDialogVisible: true
            })
        }
    }
    handleChat = async () => {
        this.setState({ InputDialogVisible: false })
        await AsyncStorage.setItem(chatName, this.state.inputedValue)
        this.props.navigation.navigate('userNumber', { customer: this.state.inputedValue, forex: this.state.companyName, forexPhone: this.state.phone });
    }
    getStatus(lastseen) {
        const status = new Date().valueOf() - lastseen
        return status <= 60000 ? 'success' : ''
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
                                title={item.companyName}
                                subtitle={item.email}
                                hideAvatar={false}
                                roundAvatar={true}
                                avatar={item.companyName.substring(0, 2).toUpperCase()}
                                onPress={() => this.handleCustomer(item.companyName, item.userPhone)}
                                rightComponentText={''}
                                value={0}
                                status="success"
                                status1={this.getStatus(item.timestamp)}
                            />
                        )}
                        keyExtractor={this.keyExtractor}
                        initialNumToRender={this.oneScreensWorth}
                    />}
                <NameDialogComponent
                    visible={this.state.InputDialogVisible}
                    title="Your Name  "
                    description="Add your name that will show in chat"
                    onChangeTextName={(value) => this._handleChatNameInput(value)}
                    valueName={this.state.chatname}
                    onPress={this.handleChat}
                    onPressCancel={() => this.setState({ InputDialogVisible: false })}
                    label2="Continue   "
                />
            </View>
        );
    }
}

export default Chatlist