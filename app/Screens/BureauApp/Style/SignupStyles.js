import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Colors} from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    logo: {
        color: '#fff',
        opacity: 0.7,
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: height * .2,
        marginLeft: width * .05,
        // marginBottom: height * .05,
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
        height: height/14,
        borderRadius: 5,
        alignContent : 'center',
        justifyContent: 'center',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputStyle: {
        color: '#fff', 
        textDecorationLine: 'none',
    },
    texterr: {
        color: '#fff',
        marginLeft: width * .07,
    },
    ilabel: {
        marginLeft: height * .05, 
        flex: 1, 
        flexDirection: 'row',
        marginTop: height * .04,
    },
    picker: {
        borderRadius: 5,
        // marginTop: height * .05,
        marginLeft: width * .05,
        marginRight: width * .05,
        height: 40,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        color: Colors.snow
    },
    label: {
        marginLeft: height * .02,
        // marginTop: 10,
        fontSize: 16,
        color: Colors.snow
    },
});
export default styles;