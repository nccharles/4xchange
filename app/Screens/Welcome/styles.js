import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(39, 174, 96,0.6)'
    },
    overlayMessage: {
        alignSelf: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        alignItems: 'center',
        marginTop: screenheight / 7,
        // width: screenwidth/5,
        // height: screenwidth/5,
    },
    image: {
        // marginTop: 20,
        width: screenwidth / 1.5,
        height: screenwidth / 1.5,
        // borderRadius: screenwidth/ 2,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginVertical: 20
    },
    content: {
        alignItems: 'center',
        marginTop: -5,
    },
    topbutton: {
        marginVertical: 3,
        height: screenheight / 16,
        borderTopLeftRadius: 20,
        width: screenwidth - 50,
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    bottombutton: {
        marginVertical: 3,
        height: screenheight / 16,
        borderBottomRightRadius: 20,
        width: screenwidth - 50,
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        color: Colors.snow,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    infoBtn: {
        width: screenwidth / 7,
        height: screenwidth / 7,
        // backgroundColor: '#3498DB', 
        backgroundColor: '#e3562e',
        borderRadius: screenwidth / 7,
        justifyContent: 'center',
        marginVertical: 50,
        marginLeft: 20,
        elevation: 10
    }
});

export default styles