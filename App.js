
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Toast from 'react-native-easy-toast'
import AppNav from './app/index.js'
import { Colors } from './app/Assets/Themes/index.js';
export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AppNav />
                    <Toast ref="toast"
                        style={{ backgroundColor: Colors.secondary }}
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

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./app/Assets/Icons/more.png'),
                require('./app/Assets/MapImage/user.png'),
                require('./app/Assets/MapImage/dollar-spot.png'),
                require('./app/Assets/Icons/gps.png'),
                require('./app/Assets/Icons/get-directions-button.png'),
                require('./app/Assets/Logo/icon.png'),
                require('./app/Assets/Logo/title.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                'Lucida-Grande': require('./app/Assets/fonts/LucidaGrande.ttf'),
                'Lucida-Grande-Bold': require('./app/Assets/fonts/LucidaGrandeBold.ttf'),
                'space-mono': require('./app/Assets/fonts/SpaceMono-Regular.ttf')
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        this.refs.toast.show(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.transparent,
        fontFamily: 'Lucida-Grande',
    },
});
