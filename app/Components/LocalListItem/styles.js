import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    // $underlayColor: '#E2E2E2',
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    wrapper:{
        backgroundColor: '#00b174'
    },
    text: {
        fontSize: 16,
        color: '#343434'
    },
    separator: {
        marginLeft: 20,
        backgroundColor: '#E2E2E2',
        flex: 1,
        height: StyleSheet.hairlineWidth
    },
})

export default styles