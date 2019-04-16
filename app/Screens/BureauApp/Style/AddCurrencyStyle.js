import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})
