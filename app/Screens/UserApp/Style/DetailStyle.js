import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: screenwidth / 6,
        height: screenwidth / 6,
        borderRadius: (screenwidth / 6) / 2,
    },
    avatarTxt: {
        fontSize: screenwidth / 20,
        color: Colors.primaryWhite,
        fontFamily: 'Lucida-Grande-Bold',

    },
    titleContainer: {
        flex: 1,
        flexDirection: "column",
        alignSelf: 'center',
        marginVertical: 20,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    header: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 2,
        justifyContent: 'space-between'
    },
    title: {
        color: Colors.primaryLight,
        fontSize: screenwidth / 20,
        fontFamily: 'Lucida-Grande-Bold',
        paddingTop: 12,
    },
    contactContainer: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    contacts: {
        fontFamily: 'Lucida-Grande-Bold',
        marginRight: 15,
    },
    separator: {
        flex: 1,
        height: 0.5,
        width: screenwidth,
        backgroundColor: Colors.primaryGray,
        margin: 8
    },
    linearseparator: {
        flex: 1,
        height: 5,
        width: screenwidth,
        margin: 0
    },
    itemContainer: {
        flexDirection: "row",
        marginLeft: 10,
        paddingVertical: 20
    },
    infocontent: {
        marginLeft: 20,
        fontSize: screenwidth / 30,
        fontFamily: 'Lucida-Grande',

    },
    itemTitle: {
        paddingVertical: 15,
        color: Colors.darkGray,
        fontFamily: 'Lucida-Grande-Bold',
    },
    infoTitle: {
        fontSize: screenwidth / 25,
        color: Colors.darkGray,
        fontFamily: 'Lucida-Grande-Bold',
    },
    info: {
        fontSize: screenwidth / 30,
        color: Colors.primaryGray,
        fontFamily: 'Lucida-Grande',
    }
})