import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    width: screenwidth - 20,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5.0,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Colors.lightGray,
    marginVertical: 2,
    margin: 10,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin,
    flexDirection: 'row'
  },
  boldLabel: {
    paddingVertical: 2,
    fontFamily: 'Lucida-Grande-Bold',
    fontSize: screenwidth / 25,
    color: Colors.primaryGray,
  },
  label: {
    paddingVertical: 5,
    fontFamily: 'Lucida-Grande-Bold',
    color: Colors.primaryGray,
    fontSize: screenwidth / 30
  },

  image: {
    width: 80,
    height: 90,
    borderRadius: 5,
    marginLeft: 10
  },
  textHead: {
    marginLeft: 5,
    fontSize: screenwidth / 20,
    fontFamily: 'Lucida-Grande-Bold',
    textAlign: 'center'
  },
  cardContainer: {
    height: screenheight - 5,
    width: screenwidth - 5,
    backgroundColor: Colors.primary
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
    height: 40,
    width: 200,
    alignSelf: 'center'
  },

})
