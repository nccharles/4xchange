import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native';
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
                    <Dialog.Title>{title}   </Dialog.Title>
                    <Dialog.Description>
                        {description}
                    </Dialog.Description>
                    <Dialog.Input
                        style={styles.input}
                        placeholder="Enter Your name"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        placeholderTextColor='#99A3A4'
                        underlineColorAndroid='transparent'
                        onChangeText={onChangeTextName}
                        value={valueName}
                    />
                    <Dialog.Button label="Cancel   " onPress={onPressCancel} />
                    <Dialog.Button label={label2} onPress={onPress} />
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