import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../../Assets/Themes'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: width / 3,
        backgroundColor: Colors.background,
    },
    input: {
        color: Colors.darkGray,
        borderRadius: 5,
        marginTop: height * .05,
        alignSelf: 'center',
        height: height / 16,
        width: width - 50,
    },
    button: {
        backgroundColor: Colors.background,
        marginTop: height * .05,
        width: width - 50,
        height: height / 14,
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 0,
        fontFamily: 'Lucida-Grande-Bold',
        color: Colors.darkGray,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputStyle: {
        color: '#333',
        textDecorationLine: 'none',
        fontFamily: 'Lucida-Grande',
    },
    texterr: {
        color: 'red',
        fontFamily: 'Lucida-Grande',
        marginLeft: width * .07,
    },
    ilabel: {
        marginLeft: height * .05,
        flex: 1,
        flexDirection: 'row',
        marginTop: height * .04,
        fontFamily: 'Lucida-Grande-Bold',
    },
    picker: {
        borderRadius: 5,
        // marginTop: height * .05,
        marginLeft: width / 5,
        marginRight: width / 5,
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
        color: Colors.primary,
        fontFamily: 'Lucida-Grande',
    },
    label: {
        marginLeft: height * .02,
        // marginTop: 10,
        fontSize: 30,
        color: Colors.primary,
        fontFamily: 'Lucida-Grande-Bold',
    },

});
export default styles;