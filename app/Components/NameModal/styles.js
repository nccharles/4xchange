import { Dimensions, Platform, StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width

export default StyleSheet.create({

    input: {
        height: 40,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 2,
        borderBottomColor: Colors.secondary,
        width: screenwidth - 70,
        paddingHorizontal: 10,
        fontSize: 18,
        fontFamily: 'Lucida-Grande',
    },
    button: {
        fontFamily: 'Lucida-Grande',
        color: Colors.primary
    },
    title: {
        fontFamily: 'Lucida-Grande-Bold',
        color: Colors.primary
    },
    details: {
        fontFamily: 'Lucida-Grande',
        color: Colors.darkGray
    }
})
