import {Dimensions, Platform, StyleSheet} from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'center',
    width: screenwidth -5,
    height: screenheight /7.5,
    // elevation: 3,
    backgroundColor: Colors.snow,
    marginVertical: 10,
    borderRadius: 5,
    // flexDirection: 'row'
  },
  left:{
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
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.charcoal,
  },
  label: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 14,
    position: 'absolute',
    left: 15,
    top: 20
  },
  label2: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 14,
    position: 'absolute',
    left: 15,
    bottom: 21
  },
  icon_btn: {
    position:"absolute",
    bottom:0,
    left: 30
  },
  amount: {
    fontSize: 16, 
    color: '#99A3A4', 
    fontWeight:'bold'
  },
  currencyName:{
    fontSize: 16, 
    color: '#99A3A4',  
    fontWeight:'bold',
    marginLeft: 5
  },
  rightContainer:{
    flex: 4, 
    flexDirection: 'column',
    justifyContent: 'space-between', 
  },
  rightCategory:{
    fontSize: 16,  
    color: Colors.dark, 
    fontWeight:'bold', 
    position: 'absolute',
    right: 15,
    top: 25
  },
  flag_icon: {
    width: screenwidth/ 12, 
    height: screenheight /20,
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 15
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginTop: -2,
    // marginLeft: screenwidth/ 2.5 
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
    fontSize: 12
  },
  parent: {
    flex: 1,
    width: screenwidth -30,
    height: screenheight /10,
    flexDirection: 'row',
    backgroundColor: 'white',
    // elevation: 3,
    backgroundColor: Colors.snow,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
    // borderRadius: 5,
  },
  imageContainer: {
    borderWidth: 0.5,
    width: screenwidth/ 6,
    height: screenheight /17,
    marginLeft: 8,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  leftRectangular: {
    flex: 1, 
    width: '100%',
    height: '100%',
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
    fontSize: 14
  },
  subTitle: {
    fontWeight: '500',
    color: 'gray',
    fontSize: 12
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
  
  separator: {
    flex: 1,
    height: 1, 
    width: screenwidth -5,
    backgroundColor: "#CED0CE", 
    // margin: 8
  },
  
});
