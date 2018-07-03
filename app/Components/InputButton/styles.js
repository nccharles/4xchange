import {StyleSheet, Dimensions} from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const INPUT_HEIGHT = 48
const BORDER_RADIUS= 4
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
    // $buttonBackgroundColorBase: '$white',
    // $buttonBackgroundColorModifier: 0.1,

    container:{
        // backgroundColor: '#CCD1D1',
        width: screenwidth -30,
        // height: (screenheight /11)- 10,
        borderRadius: BORDER_RADIUS,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // margin: 10,
        // marginHorizontal: 20
    },
    InputButton:{
        height: screenheight/16,
        width: screenwidth /5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // backgroundColor: '#3498DB',
        backgroundColor: Colors.dark,
        elevation: 10
    },
      buttonText:{
        fontWeight: '600',
        fontSize: 16,
        paddingHorizontal: 5,
        color: 'white'
    },
    buttonContainer:{
        height: screenheight/16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCD1D1',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#CCD1D1',
    },
    buttonTextInter:{
        fontWeight: '600',
        fontSize: 18,
        paddingHorizontal: 16,
        color: Colors.primary
    },
    input:{
        backgroundColor: Colors.snow,
        height: screenheight/16,
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 8,
        marginRight: 10,
        color: 'grey',
        borderWidth: 2,
        borderColor: '#CCD1D1',
        borderRadius: 5
        // borderWidth: 2
    },
    inputInter:{
        backgroundColor: Colors.snow,
        height: screenheight/16,
        // width: screenwidth -100,
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 8,
        marginLeft: 10,
        color: 'grey',
        borderWidth: 2,
        borderColor: '#CCD1D1',
        borderRadius: 10
    },
    border:{
        height: INPUT_HEIGHT,
        width: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    ContainerStylesDisabled: {
        backgroundColor: 'grey'
    },

})