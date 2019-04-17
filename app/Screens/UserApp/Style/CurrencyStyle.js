import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Assets/Themes'

const INPUT_HEIGHT = 48
const BORDER_RADIUS = 4
const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray
  },
  row: {
    flex: 1,
    width: screenwidth - 20,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5.0,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Colors.snow,
    marginVertical: 10,
    margin: 10,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin,
    flexDirection: 'row'
  },
  boldLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lucida-Grande-Bold',
    color: Colors.primaryGray,
  },
  label: {
    flex: 1,
    fontFamily: 'Lucida-Grande',
    color: 'grey'
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  image: {
    width: 80,
    height: 90,
    borderRadius: 5,
    marginLeft: 10
  },
  textHead: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lucida-Grande',
  },
  cardContainer: {
    height: screenheight - 5,
    width: screenwidth - 5,
    backgroundColor: '#3498DB'
  },
  searchBar: {
    backgroundColor: Colors.primaryLight
  },
  input: {
    height: INPUT_HEIGHT,
    fontSize: 18,
    paddingHorizontal: 8,
    color: 'grey',
    borderWidth: 1,
    borderColor: '#CCD1D1',
    borderRadius: 10
  },
})
