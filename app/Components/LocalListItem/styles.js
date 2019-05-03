import { StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes';

const styles = StyleSheet.create({
    // $underlayColor: '#E2E2E2',
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.primaryWhite,
    },
    wrapper: {
        backgroundColor: Colors.secondary
    },
    text: {
        fontSize: 16,
        color: Colors.darkGray
    },
    separator: {
        marginLeft: 20,
        backgroundColor: Colors.lightGray,
        flex: 1,
        height: StyleSheet.hairlineWidth
    },
})

export default styles