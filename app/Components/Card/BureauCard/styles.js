import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, Colors } from '../../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenwidth - 30,
    height: screenheight / 10,
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 8,
    backgroundColor: Colors.snow,
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
    // flex: 2.5, 
    // justifyContent: 'center'
  },
  category: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.primaryGray,
    fontSize: 20,
    marginLeft: 20
  },
  boldLabel: {
    position: 'absolute',
    // top: screenheight/250,
    left: 15,
    // top: 3,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryGray,
  },
  label: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 14,
  },
  iconBtn: {
    position: 'absolute',
    right: 15,
    top: 5
    // flex: 1,
    // alignSelf: 'center',
    // alignItems: 'center',
    // marginLeft: screenwidth -180
  },
  updated: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    fontWeight: '500',
    color: Colors.secondary,
    fontSize: 13
  }
})
