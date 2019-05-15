import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    AsyncStorage, StyleSheet, Image, Alert
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import Moment from 'moment'
import { Colors } from '../../Assets/Themes'
import AddBtn from '../Buttons/AddCurrencyBtn'
import ModalComponent from '../AddCurrencyModal/modal'
import Card from '../Card/BureauCard/Card'
import DialogComponent from '../Dialog/Dialog'
import styles from '../../Screens/BureauApp/Style/AddCurrencyStyle'
import emptydata from '../../Assets/Icons/empty.png'
import { currencies, flagUrl, flagBTC, flagXAG, flagXAU, flagXDR, url } from '../../Assets/resources/data';
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone, cName, chatNum, chatName } from '../../Config/constants';
import { registerForPushNotificationsAsync } from '../../Config/notice';

const initialState = {
    loading: true,
    inputedValue: 0,
    initialCurrency: null,
    category: 'Buy or Sell',
    isBuying: true,
    DeleteDialogVisible: false,
    UpdateModal: false,
    AddModal: false,
    currentItem: {
        askPrice: null,
        bidPrice: null,
        Currency: null,
        quote: null,
        uid: null,
    },
    error: null,
    isSubmitting: false,
}

class ManageCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            data: null,
            isLoading: true,
            userPhone: null,
            companyName: null,
            baseCurrency: 'USD',
            quoteCurrency: 'EUR',
            newCurrency: {
                currency: 'USD',
                quote: 'EUR',
                askPrice: null,
                bidPrice: null,
            }
        }
    };

    async componentWillMount() {
        this.setState(state => ({
            newCurrency: {
                ...state.newCurrency,
                currency: 'USD',
                quote: 'EUR',
            }
        }))
        const currentUser = await AsyncStorage.getItem(userPhone)
        console.log(currentUser)
        this.setState({
            companyName: await AsyncStorage.getItem(cName),
            userPhone: currentUser
        })
        this._getUserCurrencies()
        this._getAllCustomers(currentUser)
        registerForPushNotificationsAsync()
        await AsyncStorage.setItem(chatName, this.state.companyName)
        await AsyncStorage.setItem(chatNum, currentUser)
    }
    handleFlag = (currency) => {
        if (currency) {
            switch (currency) {
                case 'BTC':
                    return flagBTC;
                case 'XDR':
                    return flagXDR;
                case 'XAU':
                    return flagXAU;
                case 'XAG':
                    return flagXAG;
                default:
                    return `${flagUrl}/${currency.substr(0, 2)}.png`;

            }
        }
    };

    _getUserCurrencies = async () => {
        const { userPhone } = this.state
        const that = this

        firebase.database().ref(`/currencies`)
            .orderByChild(`userPhone`)
            .equalTo(userPhone)
            .on('value', snapshot => {
                const currencies = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid }
                })
                that.setState({
                    data: currencies,
                    isLoading: false,
                })
            })
    }
    _handleSaveCurrency = async () => {
        const { newCurrency: { currency, quote, askPrice, bidPrice }, userPhone, companyName, isSubmitting } = this.state
        if (_.find(this.state.data, { currency: currency, quote: quote })) {
            Alert.alert(`${currency} in ${quote} already exist!`, 'Click to the flag buttons to change currencies exchange and add your amount.');
            this.setState({
                isSubmitting: false,
            })
            return
        }
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        if (!userPhone) {
            return
        }
        if (!currency || !quote || !askPrice || !bidPrice) {
            Alert.alert('Uncomplete!', 'Please insert your exchange price related to the currencies.');
            this.setState({
                isSubmitting: false,
            })
            return
        }
        const updatedAt = new Date()
        const that = this
        await firebase.database().ref(`/currencies`)
            .push({
                currency,
                quote,
                askPrice,
                bidPrice,
                updatedAt,
                companyName,
                userPhone,
            })

            .then(response => {
                that.setState(state => ({
                    ...initialState,
                    newCurrency: {
                        askPrice: '',
                        bidPrice: '',
                        currency: 'USD',
                        quote: 'EUR'
                    },
                }))
                this.refs.toast.show('Currency added!');
            })
            .catch(err => {
                console.log(`error: ${err}`)
            })
    }
    _handleUpdateCurrency = async () => {
        const { currentItem: { askPrice, bidPrice, uid }, isSubmitting, companyName } = this.state
        const that = this
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        const updatedAt = new Date()
        await firebase.database().ref(`/currencies/${uid}`)
            .update({
                askPrice,
                bidPrice,
                updatedAt,
                companyName,
            })
            .then(response => {
                that.setState({
                    ...initialState,
                })
                this.refs.toast.show('Currency updated!');
            })
            .catch(err => {
                console.log(err.message)
            })
    }



    Show_Custom_Alert = () => {
        this.setState({ AddModal: true });
    }

    showDeleteDialog = (item) => {
        this.setState({
            DeleteDialogVisible: true,
            currentItem: {
                askPrice: item.askPrice,
                bidPrice: item.bidPrice,
                uid: item.uid,
                currency: item.currency,
                quote: item.quote
            }
        });
    };
    showUpdateDialog = (item) => {
        this.setState({
            UpdateModal: true,
            currentItem: {
                askPrice: item.askPrice,
                bidPrice: item.bidPrice,
                uid: item.uid,
                currency: item.currency,
                quote: item.quote

            }
        });
    };

    handleCancel = () => {
        this.setState((state) => ({
            ...initialState,
            baseCurrency: 'USD',
            quoteCurrency: 'EUR',
            newCurrency: {
                ...state.newCurrency,
                currency: 'USD',
                quote: 'EUR'
            }

        }));
    };

    handleDelete = () => {
        const { currentItem, isSubmitting } = this.state
        const that = this
        if (isSubmitting) {
            return
        }
        this.setState({
            isSubmitting: true
        })
        firebase.database().ref(`currencies/${currentItem.uid}`)
            .set(null)
            .then(response => {
                this.refs.toast.show('Currency deleted!');
            })
            .catch(err => {
                console.log(err)
            })
        that.setState({ ...initialState })
    };
    handleUpdate = () => {
        console.log('updated')
    }

    _handleCurrencyInput = (value) => {
        const currencyEntered = parseInt(value)
        if (currencyEntered) {
            this.setState({
                inputedValue: currencyEntered
            })
            return
        }
        this.setState({
            inputedValue: 0
        })
    }

    _handleNewCurrencyTextInput = (key, value) => {
        this.setState(state => ({
            newCurrency: {
                ...state.newCurrency,
                [key]: value,
            }
        }))
    }
    _handleUpdateCurrencyTextInput = (key, value) => {
        this.setState(state => ({
            currentItem: {
                ...state.currentItem,
                [key]: value,
            }
        }))
    }



    setBaseCurrency = async (currency) => {

        const { baseCurrency } = currency
        if (baseCurrency === this.state.quoteCurrency) {
            this.refs.toast.show('Choose different Currency!');
            this.setState(state => ({
                AddModal: true,
            }))
        } else {
            this.setState(state => ({
                baseCurrency: baseCurrency,
                AddModal: true,
                newCurrency: {
                    ...state.newCurrency,
                    currency: baseCurrency
                }
            }))
        }
    }
    setQuoteCurrency = async (currency) => {
        const { quoteCurrency } = currency
        if (quoteCurrency === this.state.baseCurrency) {
            this.refs.toast.show('Choose different Currency!');
            this.setState(state => ({
                AddModal: true,
            }))
        } else {
            this.setState(state => ({
                quoteCurrency: quoteCurrency,
                AddModal: true,
                newCurrency: {
                    ...state.newCurrency,
                    quote: quoteCurrency
                }
            }))
        }
    }
    getBaseCurrency = async (setBaseCurrency) => {
        this.setState({
            ...initialState,
        })
        this.props.navigation.navigate('CurrencyList', { setBaseCurrency: this.setBaseCurrency })
    }
    getQuoteCurrency = async (setQuoteCurrency) => {
        this.setState({
            ...initialState,
        })
        this.props.navigation.navigate('CurrencyList', { setQuoteCurrency: this.setQuoteCurrency })
    }
    keyExtractor = (item, index) => index.toString()

    oneScreensWorth = 30
    openModal = () => {
        alert('ok')
    }

    render() {
        const { inputedValue, isLoading, error } = this.state
        return (
            <View style={styles.container}>

                {isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View> : this.state.data.length === 0 ?
                        <View style={[
                            StyleSheet.absoluteFill,
                            {
                                backgroundColor: Colors.primaryWhite,
                                justifyContent: 'center',
                                alignItems: 'center',
                                bottom: 50
                            }]}>
                            <Image
                                source={emptydata}
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    resizeMode: 'contain'
                                }}
                            />
                        </View>
                        : < FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <Card
                                    onPress={() => this.showUpdateDialog(item)}
                                    onPressDel={() => this.showDeleteDialog(item)}
                                    text={item.currency}
                                    askPrice={item.askPrice + ' ' + item.quote}
                                    bidPrice={item.bidPrice + ' ' + item.quote}
                                    time={Moment(item.updatedAt).fromNow()} />
                            )}
                            keyExtractor={this.keyExtractor}
                            initialNumToRender={this.oneScreensWorth}
                        />}
                <ModalComponent
                    visible={this.state.AddModal}
                    baseFlag={{ uri: this.handleFlag(this.state.baseCurrency) }}
                    quoteFlag={{ uri: this.handleFlag(this.state.quoteCurrency) }}
                    onRequestClose={() => this.Show_Custom_Alert(!this.state.Alert_Visibility)}
                    onPressBase={() => this.getBaseCurrency(this.state.baseCurrency)}
                    onPressQuote={() => this.getQuoteCurrency(this.state.quoteCurrency)}
                    baseCurrencyBtnTxt={this.state.baseCurrency}
                    quoteCurrencyBtnTxt={this.state.quoteCurrency}
                    onChangeTextBuy={(value) => this._handleNewCurrencyTextInput('askPrice', value)}
                    onChangeTextSell={(value) => this._handleNewCurrencyTextInput('bidPrice', value)}
                    onPressCancel={this.handleCancel}
                    onPressAction={this._handleSaveCurrency.bind(this)}
                    actionBtnTxt="Save"
                    valueBuy={this.state.newCurrency.askPrice}
                    valueSell={this.state.newCurrency.bidPrice}
                    icon="download"
                />
                <ModalComponent
                    visible={this.state.UpdateModal}
                    baseFlag={{ uri: this.handleFlag(this.state.currentItem.currency) }}
                    quoteFlag={{ uri: this.handleFlag(this.state.currentItem.quote) }}
                    onRequestClose={() => this.Show_Custom_Alert(!this.state.Alert_Visibility)}
                    baseCurrencyBtnTxt={this.state.currentItem.currency}
                    quoteCurrencyBtnTxt={this.state.currentItem.quote}
                    onChangeTextBuy={(value) => this._handleUpdateCurrencyTextInput('askPrice', value)}
                    onChangeTextSell={(value) => this._handleUpdateCurrencyTextInput('bidPrice', value)}
                    onPressCancel={this.handleCancel}
                    onPressAction={this._handleUpdateCurrency.bind(this)}
                    valueBuy={this.state.currentItem.askPrice}
                    valueSell={this.state.currentItem.bidPrice}
                    actionBtnTxt="Update"
                    icon="refresh-ccw"
                />
                <DialogComponent
                    visible={this.state.DeleteDialogVisible}
                    title="Currency delete"
                    description="Are you sure you want to delete this currency?"
                    // input="892"
                    onPress={this.handleDelete}
                    onPressCancel={this.handleCancel}
                    label2="Delete"
                />
                <AddBtn onPress={this.Show_Custom_Alert.bind(this)} />
                <Toast ref="toast"
                    style={{ backgroundColor: Colors.primary }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1500}
                    opacity={1}
                    textStyle={{ color: '#fff' }} />
            </View>
        );
    }
}

export default ManageCurrency