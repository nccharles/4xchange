import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Platform } from 'react-native';
import Dialog from "react-native-dialog";
import styles from './styles'
class DialogNameComponent extends Component {

    render() {

        const {
            visible,
            onPress,
            onPressCancel,
            title,
            input,
            description,
            label2,
            onChangeTextName,
            valueName
        } = this.props

        return (
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title style={styles.title}>{title}   </Dialog.Title>
                    <Dialog.Description style={styles.details}>
                        {description}
                    </Dialog.Description>
                    <Dialog.Input
                        style={styles.input}
                        placeholder="Enter name"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        autoFocus={Platform.OS === 'ios' ? true : false}
                        placeholderTextColor='#99A3A4'
                        underlineColorAndroid='transparent'
                        onChangeText={onChangeTextName}
                        value={valueName}
                    />
                    <Dialog.Button style={styles.button} label="Cancel   " onPress={onPressCancel} />
                    <Dialog.Button style={styles.button} label={label2} onPress={onPress} />
                </Dialog.Container>
            </View>
        );
    }
}

DialogNameComponent.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    input: PropTypes.string,
    onChangeTextName: PropTypes.func,
    valueName: PropTypes.func,
    onPress: PropTypes.func,
    onPressCancel: PropTypes.func,
    label2: PropTypes.string
}

export default DialogNameComponent