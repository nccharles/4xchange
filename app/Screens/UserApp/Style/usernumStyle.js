import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');
// your brand's theme primary color
const brandColor = Colors.primary;

const styles = StyleSheet.create({
    countryPicker: {
        alignItems: 'center',
        justifyContent: 'center'

    },
    header: {
        color: brandColor,
        opacity: 0.7,
        fontFamily: 'Lucida-Grande-Bold',
        fontSize: width / 20,
        marginTop: height * .1,
        marginLeft: width * .05,
        marginBottom: height * .1,
    },
    container: {
        flex: 1,
    },
    form: {
        margin: 20
    },
    textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: width / 20,
        color: brandColor,
        fontFamily: 'Lucida-Grande-Bold',
    },
    button: {
        marginTop: 20,
        height: 50,
        backgroundColor: brandColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: width / 25,
        fontFamily: 'Lucida-Grande-Bold',
    },
    wrongNumberText: {
        margin: 10,
        fontSize: width / 30,
        textAlign: 'center'
    },
    disclaimerText: {
        marginTop: 30,
        fontSize: width / 35,
        color: Colors.primaryGray
    },
    callingCodeView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    callingCodeText: {
        fontSize: width / 20,
        color: brandColor,
        fontFamily: 'Lucida-Grande-Bold',
        paddingRight: 10
    }
});
export default styles;