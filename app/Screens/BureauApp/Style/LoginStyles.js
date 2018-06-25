import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Colors} from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    keyboard: {
        flex: 1,
        // justifyContent: 'space-between',
    },
    logo: {
        color: '#fff',
        opacity: 0.7,
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: height * .2,
        marginLeft: width * .05,
        marginBottom: height * .1,
    },
    input: {
        backgroundColor: Colors.primaryLight,
        borderRadius: 5,
        marginTop: height * .05,
        alignSelf: 'center',
        height: height/16,
        width: width -50,
    },
    button: {
        backgroundColor: Colors.dark,
        marginTop: height * .05,
        width: width -50,
        height: height/16,
        borderRadius: 5,
        alignContent : 'center',
        justifyContent: 'center',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        color: '#fff',
        marginLeft: width * .07,
        marginTop: 20,
    },
    texterr:{
        color: '#fff',
        marginLeft: width * .07,
    },
    user: {
        marginTop: height * .1,
    },
    here: {
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 5,
    },
    icou: {
        marginTop: height * .1,
        marginLeft: width * .05,
    },
    indicator: {
        marginTop: height * .05,
    }
});
export default styles;