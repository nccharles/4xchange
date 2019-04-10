import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import { withNavigation } from 'react-navigation';
import logout from '../..//Assets/Icons/logout.png'
import styles from './styles'
import { userChoice } from '../../Config/constants';
import { Colors } from '../../Assets/Themes';
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
            this.refs.toast.show(error.message);
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


export default withNavigation(HeaderBtn);