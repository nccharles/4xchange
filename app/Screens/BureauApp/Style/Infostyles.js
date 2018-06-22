import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        // backgroundColor: '#e3562e',
        borderRadius: 5,
        marginTop: height * .05,
        marginLeft: width * .05,
        marginRight: width * .05,
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#99A3A4',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
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
    },
    button: {
        backgroundColor: '#740000',
        borderRadius: 5,
        marginTop: 20,
        marginLeft: width * .05,
        marginRight: width * .05,
    },
    inputStyle: {
        color: '#000',
        textDecorationLine: 'none',
    },
    label: {
        marginLeft: height * .02,
        // marginTop: 10,
        fontSize: 16,
    },
    ilabel: {
        marginLeft: height * .05, 
        flex: 1, 
        flexDirection: 'row',
        marginTop: height * .04,
    },
});
export default styles;