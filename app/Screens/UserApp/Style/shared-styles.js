import { StatusBar, StyleSheet, Dimensions } from 'react-native';

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

// export const sharedSytles = {
//   backgroundColor: 'rgba(0, 190, 0,1)',
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: sharedSytles.backgroundColor,
  },
  inputContainer: {
    height: screenheight /8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  input: {
    height: 47,
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    fontSize: 18,
  },
  buttonContainer:{
        height: (screenheight /11)- 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCD1D1',
        borderRadius: 10
        // borderTopLeftRadius: BORDER_RADIUS,
        // borderBottomLeftRadius: BORDER_RADIUS,
        // backgroundColor: '#CCD1D1'
    },
    buttonText:{
        fontWeight: '600',
        fontSize: 20,
        paddingHorizontal: 16,
        color: '#5499C7'
    },
  // buttonText: {
  //   fontWeight: '600',
  //   fontSize: 20,
  //   color: 'black',
  // },
  // buttonContainer: {
  //   height: 48,
  //   paddingRight: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  // },
  separator: {
    height: '100%',
    width: StyleSheet.hairlineWidth,
    backgroundColor: "black",
  },
  list: {
    width: '99%',
    paddingTop: 10,
    backgroundColor: 'white'
  }
});

export default styles