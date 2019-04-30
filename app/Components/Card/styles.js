import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'center',
    width: screenwidth - 5,
    height: screenheight / 7.5,
    backgroundColor: Colors.snow,
    marginVertical: 10,
    borderRadius: 5,
  },
  left: {
    width: 20,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    marginLeft: -12
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 2.5,
  },
  leftCategory: {
    position: 'absolute',
    left: 15,
    bottom: 1
  },
  boldLabel: {
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: 14,
    fontFamily: 'Lucida-Grande-Bold',
    color: Colors.primaryDark,

  },
  label: {
    fontWeight: '500',
    color: Colors.primaryGray,
    fontSize: 14,
    position: 'absolute',
    left: 15,
    top: 30,
    fontFamily: 'Lucida-Grande',
  },
  label2: {
    fontWeight: '500',
    color: Colors.primaryGray,
    fontSize: 14,
    position: 'absolute',
    left: 15,
    bottom: 10
  },
  icon_btn: {
    position: "absolute",
    bottom: 0,
    left: 30
  },
  amount: {
    fontSize: 14,
    color: Colors.lightGray,
    fontFamily: 'Lucida-Grande-Bold',
  },
  time: {
    fontSize: 12,
    color: Colors.secondary,
  },
  currencyName: {
    fontSize: 14,
    color: Colors.lightGray,
    fontFamily: 'Lucida-Grande-Bold',
    marginLeft: 5
  },
  rightContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightCategory: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: 'Lucida-Grande-Bold',
    position: 'absolute',
    right: 15,
    top: 10
  },
  flag_icon: {
    width: screenwidth / 12,
    height: screenheight / 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 15
  },
  equivalentContainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    flexDirection: 'row'
  },
  updated: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    fontWeight: '500',
    color: Colors.secondary,
    fontSize: 12,
    fontFamily: 'Lucida-Grande',
  },
  parent: {
    flex: 1,
    width: screenwidth - 30,
    height: screenheight / 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    // elevation: 3,
    backgroundColor: Colors.background,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
    // borderRadius: 5,
  },
  imageContainer: {
    borderWidth: 0.5,
    width: screenwidth / 6,
    height: screenheight / 17,
    marginLeft: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  leftRectangular: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageChatContainer: {
    borderWidth: 0,
    width: screenwidth / 8,
    height: screenwidth / 8,
    borderRadius: screenwidth / 8,
    marginLeft: 8,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  leftCircle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  center: {
    height: '100%',
    flex: 0.90,
    flexDirection: 'column',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  titleContainer: {
    justifyContent: 'center'
  },
  subTitleContainer: {
    justifyContent: 'center'
  },
  title: {
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
    fontFamily: 'Lucida-Grande',
  },
  subTitle: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Lucida-Grande',
  },
  right: {
    height: '100%',
    position: 'absolute',
    paddingRight: 8,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  message: {
    position: 'absolute',
    right: screenwidth / (screenwidth / 30),
    bottom: 4,
  },
  separator: {
    flex: 1,
    height: 1,
    width: screenwidth - 5,
    backgroundColor: Colors.lightGray,
    // margin: 8
  },
  Chatseparator: {
    flex: 1,
    height: 1,
    width: screenwidth - 10,
    backgroundColor: Colors.lightGray,
    marginLeft: screenwidth / 5
  }

});
