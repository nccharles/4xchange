import { StyleSheet } from 'react-native';
import { Colors } from '../../Assets/Themes'

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
    fontSize: 14,
    fontFamily: 'Lucida-Grande-Bold',
  },
})