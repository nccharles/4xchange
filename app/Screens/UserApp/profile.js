import React, { Component } from 'react';
import {
    ScrollView, View, Text, ActivityIndicator
} from 'react-native';
import styles from './Style/DetailStyle'
import Header from '../../Components/Header/DetailsHeader'
import { Colors } from '../../Assets/Themes'
import Toast, { DURATION } from 'react-native-easy-toast'

import { Icon } from 'expo';
const colors = [
    '#7FB3D5', '#10ac84', '#B53471', '#5758BB', '#EB9CA8', '#48dbfb',
    '#8A004F', '#C4E538', '#1dd1a1', '#00a3e1', '#9980FA'
]

export default class Details extends Component {

    constructor(props) {
        super(props)
        this.state = {
            InputDialogVisible: false,
            userPhone: null,
            chatname: null,
            inputedValue: '',
            loading: true
        }
    }
    static navigationOptions = ({ navigation }) => {
        let Title = 'Settings   '
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
    componentDidMount() {
        this.setState({
            loading: false
        })
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

            <View style={styles.container}>
                <ScrollView style={styles.card}>
                    <View style={styles.header}>
                        <View style={[styles.avatar, { backgroundColor: colors[Math.floor(Math.random() * colors.length)] }]}>
                            <Icon.MaterialCommunityIcons name="information-variant" color="#fff" size={30} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text
                                style={styles.title}>
                                Mine
                            </Text>
                            <Text style={styles.itemTitle}>Information  </Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.itemContainer}>
                        <Icon.MaterialIcons name="location-city" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Country  </Text>
                            <Text style={styles.info}>Rwanda   </Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.Entypo name="address" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Address  </Text>
                            <Text style={styles.info}>KK 15 RD</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.MaterialCommunityIcons name="calendar-clock" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Opening hours  </Text>
                            <Text style={styles.info}> 3:00</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Icon.MaterialCommunityIcons name="calendar-check" color={Colors.primary} size={23} />
                        <View style={styles.infocontent}>
                            <Text style={styles.infoTitle}>Working Days  </Text>
                            <Text style={styles.info}>Monday to friday</Text>
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
