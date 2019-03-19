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
    card: {},
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: screenwidth / 4,
        height: screenwidth / 4,
        borderRadius: (screenwidth / 4) / 2,
        backgroundColor: '#BFC9CA',
        marginTop: 20
    },
    avatarTxt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: 'center',
        marginVertical: 10
    },
    title: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contactContainer: {
        flexDirection: "row",
        marginLeft: 10
    },
    contacts: {
        fontWeight: 'bold',
        marginRight: 15
    },
    separator: {
        flex: 1,
        height: 1,
        width: screenwidth,
        backgroundColor: "#CED0CE",
        margin: 8
    },
    itemContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginLeft: 10
    },
    itemTitle: {
        fontWeight: '900',
        marginRight: 15
    },
    flag_icon: {
        width: screenwidth / 8,
        height: screenheight / 25,
        backgroundColor: 'transparent',
        // alignSelf: 'center',
        // justifyContent: 'center',
        marginTop: -2,
        marginLeft: screenwidth / 2.5
    },
})