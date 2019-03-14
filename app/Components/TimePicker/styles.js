import { StyleSheet, Dimensions } from 'react-native'
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: height * .05,
    },
    picker: {
        height: 50,
        width: 45,
        backgroundColor: '#fff'
    },
    separator: {
        marginTop: 15,
        fontWeight: 'bold',
    }
});
export default styles;