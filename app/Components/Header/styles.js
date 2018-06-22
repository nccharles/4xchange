import {StyleSheet, Dimensions} from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenWidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.primary, 
        height: screenheight /8,
        width: screenWidth ,
        elevation: 3
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: screenheight/ 17, 
    },
    title: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20, 
        marginLeft: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 25
    },
    button: {
        marginRight: 35
    },
    image1: {
        tintColor: 'white',
        width: screenWidth/14,
        height: screenWidth/14,
        marginVertical: 2.5
    },
    image2: {
        tintColor: 'white',
        width: screenWidth/16,
        height: screenWidth/16,
        marginVertical: 5
    },
})