import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import TabNavigationScreen from './tabNav';
import HeaderBtn from '../Components/Buttons/HeaderBtn'
import { Colors } from '../Assets/Themes';
import logout from '../Assets/Icons/logout.png'
import { userChoice } from './constants';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this._clearChoiceCache
        });
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        let Title = '4xChange   '
        return {
            headerTitle: Title + '   ',
            headerRight: (
                <HeaderBtn
                    onPress={() => params.handleThis()}
                    source={logout} />
            ),
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                marginLeft: 15,
            },
        }
    };
    _clearChoiceCache = async () => {
        try {
            await AsyncStorage.setItem(userChoice, '').then(() => {
                this.props.navigation.navigate('WelcomeScreen')
            });
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Error: faild to peform action',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }
    render() {
        return (<TabNavigationScreen />);
    }
}
