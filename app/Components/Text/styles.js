import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

export default StyleSheet.create({
 wrapper: {
   height: 25,
   width: '100%',
   paddingHorizontal: 5,
   // marginTop: 2,
   justifyContent: 'center',
   backgroundColor: Colors.primary,
 },
 text: {
   color: 'white',
   textAlign: 'center',
   fontSize: 14,
   fontWeight: '600',
 },
})