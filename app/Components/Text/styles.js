import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'
const screenwidth = Dimensions.get('window').width
export default StyleSheet.create({
  wrapper: {
    height: 25,
    width: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.primaryWhite,
    textAlign: 'center',
    fontSize: screenwidth / 30,
    fontFamily: 'Lucida-Grande-Bold',
  },
})