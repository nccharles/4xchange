import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({

    input: {
        height: 40,
        borderWidth: 2,
        borderColor: Colors.primary,
        width: screenwidth - 70,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 18
    },
})
