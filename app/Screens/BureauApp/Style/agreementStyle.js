import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    button: {
        backgroundColor: Colors.primaryDark,
        marginBottom: height * .05,
        width: width - 50,
        height: height / 14,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontFamily: 'Lucida-Grande-Bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Lucida-Grande',
    },
    text: {
        marginHorizontal: 10,
        fontFamily: 'Lucida-Grande',
    }

});
export default styles;