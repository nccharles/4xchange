import PropTypes from 'prop-types';
import React from 'react';
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Text,
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { Colors } from '../../Assets/Themes';
export default class CustomActions extends React.Component {
    constructor(props) {
        super(props);
        this._images = [];
        this.state = {
            modalVisible: false,
        };
        this.onActionsPress = this.onActionsPress.bind(this);
        this.selectImages = this.selectImages.bind(this);
    }

    setImages(images) {
        this._images = images;
    }

    getImages() {
        return this._images;
    }

    setModalVisible(visible = false) {
        this.setState({ modalVisible: visible });
    }

    onActionsPress() {
        const options = ['Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                this.props.onSend({
                                    location: {
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                    },
                                });
                            },
                            (error) => alert(error.message),
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                        );
                        break;
                    default:
                }
            });
    }

    selectImages(images) {
        this.setImages(images);
    }

    renderNavBar() {
        return (
            <NavBar style={{
                statusBar: {
                    backgroundColor: Colors.primary,
                },
                navBar: {
                    backgroundColor: Colors.primary,
                },
            }}>
                <NavButton onPress={() => {
                    this.setModalVisible(false);
                }}>
                    <NavButtonText style={{
                        color: Colors.primaryWhite,
                    }}>
                        {'Cancel'}
                    </NavButtonText>
                </NavButton>
                <NavTitle style={{
                    color: Colors.primaryWhite,
                }}>
                    {'Camera Roll'}
                </NavTitle>
                <NavButton onPress={() => {
                    this.setModalVisible(false);

                    const images = this.getImages().map((image) => {
                        return {
                            image: { uri: 'data:image/jpeg;base64,' + image.uri },
                        };
                    });
                    this.props.onSend(images);
                    this.setImages([]);
                }}>
                    <NavButtonText style={{
                        color: Colors.primaryWhite,
                    }}>
                        {'Send'}
                    </NavButtonText>
                </NavButton>
            </NavBar>
        );
    }

    renderIcon() {
        if (this.props.icon) {
            return this.props.icon();
        }
        return (
            <View
                style={[styles.wrapper, this.props.wrapperStyle]}
            >
                <Text
                    style={[styles.iconText, this.props.iconTextStyle]}
                >
                    +
        </Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.containerStyle]}
                onPress={this.onActionsPress}
            >
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                >
                    {this.renderNavBar()}
                    <CameraRollPicker
                        maximum={10}
                        imagesPerRow={4}
                        callback={this.selectImages}
                        selected={[]}
                    />
                </Modal>
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: Colors.primary,
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
    onSend: () => { },
    options: {},
    icon: null,
    containerStyle: {},
    wrapperStyle: {},
    iconTextStyle: {},
};

CustomActions.propTypes = {
    onSend: PropTypes.func,
    options: PropTypes.object,
    icon: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    iconTextStyle: Text.propTypes.style,
};