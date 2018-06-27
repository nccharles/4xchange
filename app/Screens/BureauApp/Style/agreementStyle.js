import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Colors} from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.snow,
    },
    button: {
        backgroundColor: Colors.dark,
        marginBottom: height * .05,
        width: width -50,
        height: height/14,
        borderRadius: 5,
        alignContent : 'center',
        justifyContent: 'center',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 16,
        textAlign: 'center'
    },
    text:{
        marginHorizontal: 10
    }

});
export default styles;