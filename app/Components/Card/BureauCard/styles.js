import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenwidth - 10,
    height: screenheight / 10,
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 2,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 2,
    backgroundColor: Colors.background,
    borderRadius: Metrics.smallMargin

  },
  left: {
    width: 20,
    height: screenheight / 10,
    marginVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    marginLeft: -12
  },
  row: {
    flex: 2.5,
    // marginLeft: 5
    // flexDirection: 'row',
  },
  leftContainer: {
    flex: 2.5,
    justifyContent: 'center'
  },
  category: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Lucida-Grande-Bold',
    color: Colors.primaryGray,
    fontSize: screenwidth / 15,
    marginLeft: 20
  },
  boldLabel: {
    position: 'absolute',
    // top: screenheight/250,
    left: 15,
    // top: 3,
    fontFamily: 'Lucida-Grande-Bold',
    fontSize: screenwidth / 20,
    color: Colors.primary,
  },
  label: {
    color: Colors.primaryGray,
    fontFamily: 'Lucida-Grande',
    fontSize: screenwidth / 25,
  },
  iconBtn: {
    position: 'absolute',
    right: 15,
    top: 5
  },
  updated: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    color: Colors.secondary,
    fontFamily: 'Lucida-Grande-Bold',
    fontSize: screenwidth / 30
  }
})
