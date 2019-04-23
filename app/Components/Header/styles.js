
import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenWidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({

    container: {
        backgroundColor: Colors.primary,
        height: screenheight / 8,
        width: screenWidth,
        elevation: 3,
    },
    forex: {
        backgroundColor: Colors.primary,
        height: screenheight / 8,
        width: screenWidth,
        elevation: 0,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: screenheight / 17,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Lucida-Grande-Bold',
        marginLeft: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 25
    },
    ChatStatus: {
        flexDirection: 'column',
        color: 'white',
        marginLeft: 15,
        top: -2,
        fontFamily: 'Lucida-Grande-Bold',
        marginBottom: 6,
    },
    forexInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 50,
        paddingRight: 10
    },
    chattitle: {
        color: 'white',
        fontFamily: 'Lucida-Grande-Bold',
    },
    forexTitle: {
        color: 'white',
        fontSize: 20,
        marginRight: 20,
        fontWeight: 'bold',
        fontFamily: 'Lucida-Grande-Bold',
    },
    forexOptions: {
        fontSize: 12,
        resizeMode: "contain",
        width: screenWidth / 18,
        height: screenWidth / 18,
    },
    StatusText: {
        color: 'white',
    },
    button: {
        marginRight: 35
    },
    image1: {
        tintColor: 'white',
        width: screenWidth / 14,
        height: screenWidth / 14,
        marginVertical: 2.5
    },
    image2: {
        tintColor: 'white',
        width: screenWidth / 16,
        height: screenWidth / 16,
        marginVertical: 5
    },
})
