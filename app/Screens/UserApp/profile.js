import React, { Component } from 'react';
import {
    ScrollView, View, Text, AsyncStorage, ActivityIndicator
} from 'react-native';
import styles from './Style/DetailStyle'
import { Colors } from '../../Assets/Themes'
import Toast from 'react-native-easy-toast'
import { LinearGradient } from "expo";
//backend firebase things
import * as firebase from 'firebase'
import _ from 'lodash'
import { userPhone } from '../../Config/constants';
import { Icon } from 'expo';
export default class Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            InputDialogVisible: false,
            forexPhone: null,
            chatname: null,
            inputedValue: '',
            userInfo: {
                phone: '',
                address: '',
                openAt: '',
                closeAt: '',
                workingDays: '',
                latitude: '',
                longitude: '',
                companyName: '',
                email: '',
                countryName: 'Rwanda',
            },
            locate: true,
            loading: true,
            error: false,
        }
    }

    async componentDidMount() {
        const forexPhone = await AsyncStorage.getItem(userPhone)
        this.setState({
            forexPhone: forexPhone
        })
        this._getCompanyProfile(forexPhone)
    }


    _getCompanyProfile = async (forexPhone) => {
        const that = this
        await firebase.database().ref(`/infos/${forexPhone}/publicInfo`)
            .once('value').then(snapshot => {
                if (snapshot != null) {
                    that.setState(state => ({
                        userInfo: {
                            ...state.userInfo,
                            ...snapshot.val()
                        },
                        loading: false,
                    }))
                }
            })
            .catch(err => {
                that.setState({
                    error: true,
                })
            });
    }
    render() {
        const { loading, userInfo, forexPhone, error } = this.state
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            )
        }
        if (error) {
            return (
                <Text>No Forex Info found</Text>
            )
        }
        //const item = this.props.navigation.state.params
        return (

            <View style={styles.container}>

                <ScrollView style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text
                                style={styles.title}>
                                {userInfo.companyName + '   '}
                            </Text>
                            <Text style={styles.itemTitle}>{userInfo.email + '   '}  </Text>
                        </View>
                    </View>
                    <LinearGradient
                        colors={Colors.gradientColors}
                        start={{ x: 1.0, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.linearseparator} />
                    <View style={styles.itemContainer}>
                        <Icon.MaterialIcons name="location-city" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Country  </Text>
                            <Text style={styles.info}>{userInfo.countryName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.Entypo name="address" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Address  </Text>
                            <Text style={styles.info}>{userInfo.address}</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.MaterialCommunityIcons name="calendar-clock" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Opening hours  </Text>
                            <Text style={styles.info}>{`${userInfo.openAt} - ${userInfo.closeAt}`}</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.MaterialCommunityIcons name="calendar-check" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Working Days  </Text>
                            <Text style={styles.info}>{userInfo.workingDays}</Text>
                        </View>
                    </View>
                </ScrollView>

                <Toast ref="toast"
                    style={{ backgroundColor: Colors.primary }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }} />
            </View>
        );
    }
}
