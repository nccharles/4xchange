import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Assets/Themes'

const INPUT_HEIGHT = 48
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        width: screenwidth - 30,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    InputButton: {
        height: screenheight / 16,
        width: screenwidth / 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: screenheight / 16,
        borderTopRightRadius: screenheight / 16,
        elevation: 3
    },
    baseButton: {
        height: screenheight / 16,
        width: screenwidth / 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: screenheight / 16,
        borderTopLeftRadius: screenheight / 16,
        elevation: 3
    },
    quoteButton: {
        height: screenheight / 16,
        width: screenwidth / 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: screenheight / 16,
        borderBottomRightRadius: screenheight / 16,
        elevation: 3
    },
    buttonText: {
        fontFamily: 'Lucida-Grande-Bold',
        fontSize: screenwidth / 25,
        paddingHorizontal: 5,
        color: Colors.primaryWhite
    },
    buttonContainer: {
        height: screenheight / 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primaryGray,
    },
    buttonTextInter: {
        fontSize: screenwidth / 25,
        paddingHorizontal: 16,
        color: Colors.primary,
        fontFamily: 'Lucida-Grande-Bold',
    },
    input: {
        backgroundColor: Colors.primaryWhite,
        paddingLeft: 15,
        height: screenheight / 16,
        flex: 1,
        fontSize: screenwidth / 25,
        marginRight: 0,
        color: Colors.primaryGray,
        borderBottomWidth: 2,
        // borderBottomRightRadius: screenheight / 16,
        borderColor: Colors.primaryDark,
        fontFamily: 'Lucida-Grande-Bold',
    },
    inputInter: {
        backgroundColor: Colors.primaryWhite,
        paddingLeft: 15,
        height: screenheight / 16,
        flex: 1,
        fontSize: screenwidth / 25,
        marginRight: 0,
        color: Colors.primaryGray,
        borderBottomWidth: 2,
        borderBottomRightRadius: screenheight / 16,
        borderColor: Colors.primaryDark,
        fontFamily: 'Lucida-Grande-Bold',
    },
    border: {
        height: INPUT_HEIGHT,
        width: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.primaryBlack
    },
    ContainerStylesDisabled: {
        backgroundColor: Colors.primaryGray
    },

})