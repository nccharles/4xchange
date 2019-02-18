import React, { Component } from 'react';
import { View, TouchableOpacity, ToastAndroid, AsyncStorage, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import logout from '../..//Assets/Icons/logout.png'
import styles from './styles'
import { userChoice } from '../../Config/constants';
class HeaderBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleThis: null
        };
    }
    async componentDidMount() {
        this.setState({
            handleThis: this._clearChoiceCache
        });
    }
    _clearChoiceCache = async () => {
        try {
            await AsyncStorage.setItem(userChoice, '').then(() => {
                this.props.navigation.navigate('WelcomeScreen')
            });
        } catch (error) {
            ToastAndroid.showWithGravity(
                `Error: ${error.message}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={() => this.state.handleThis()}>
                    <Image
                        source={logout}
                        style={styles.headerImg} />
                </TouchableOpacity>
            </View>
        );
    }
}


export default withNavigation(HeaderBtn);