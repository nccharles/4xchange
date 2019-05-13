import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Assets/Themes'

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
        marginBottom: 5,
    },
    Localcontainer: {
        width: screenwidth - 5,
        height: screenheight / 7,
        flexDirection: 'column',
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginBottom: 0,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: Metrics.smallMargin,
        borderTopRightRadius: Metrics.smallMargin,
        elevation: 1
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
    input: {
        padding: 0,
        width: screenwidth - 80,
        height: screenheight / 16,
        flex: 1,
        alignSelf: 'center',
        fontSize: screenwidth / 25,
        color: Colors.primaryWhite,
        borderBottomWidth: 2,
        borderColor: Colors.primaryWhite,
        fontFamily: 'Lucida-Grande-Bold',
    },
    Buttons: {
        backgroundColor: "transparent",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        justifyContent: 'space-between',
        width: screenwidth / 4,
        height: screenheight / 18,
        borderRadius: Metrics.baseMargin,
    },
    Linear: {
        flexDirection: 'row',
        marginHorizontal: 0,
        borderRadius: Metrics.baseMargin,
        elevation: 3
    },
    flag: {
        width: screenheight / 15,
        height: screenheight / 20,
        borderRadius: Metrics.baseMargin,
    },
    currencyBtn: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
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
    exchange: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})