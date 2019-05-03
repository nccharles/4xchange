import { StatusBar, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../Assets/Themes';

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: sharedSytles.backgroundColor,
  },
  inputContainer: {
    height: screenheight / 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryWhite,
  },
  input: {
    height: 47,
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryWhite,
    fontSize: 18,
  },
  buttonContainer: {
    height: (screenheight / 11) - 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 16,
    color: Colors.primary
  },
  separator: {
    height: '100%',
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkGray,
  },
  list: {
    width: '99%',
    paddingTop: 10,
    backgroundColor: Colors.primaryWhite
  }
});

export default styles