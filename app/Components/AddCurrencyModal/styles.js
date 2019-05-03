import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100
  },
  currencyBtn: {
    backgroundColor: Colors.primaryDark,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  currencyBtnTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 20
  },
  inputTitle: {
    fontWeight: '900',
    fontSize: 20,
    marginTop: 7
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    width: screenwidth - 70,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 18
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    width: screenwidth / 2.5,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    // marginLeft: 50
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  button2: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    width: screenwidth / 2.5,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    // justifyContent: 'flex-end'
    marginLeft: 40
  }
})
