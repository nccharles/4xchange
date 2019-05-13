import { Dimensions, Platform, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: screenheight / 4,
    marginHorizontal: 10,
    borderRadius: Metrics.baseMargin,
    padding: 10,
    elevation: 3
  },

  flag: {
    width: screenheight / 15,
    height: screenheight / 20,
    borderRadius: Metrics.baseMargin,
  },
  currenciesbtn: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },
  currencyBtn: {
    backgroundColor: Colors.primaryDark,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.primaryWhite,
    width: screenwidth / 3,
    paddingHorizontal: 2,
    height: screenheight / 18,
    marginHorizontal: 20,
    borderRadius: Metrics.baseMargin,
    elevation: 3
  },
  currencyBtnTxt: {
    color: Colors.primaryWhite,
    fontSize: screenwidth / 12,
    fontFamily: 'Lucida-Grande-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 20
  },
  inputTitle: {
    fontFamily: 'Lucida-Grande-Bold',
    fontSize: screenwidth / 20,
    marginTop: 7
  },
  input: {
    height: screenheight / 16,
    borderBottomWidth: 2,
    borderColor: Colors.lightGray,
    width: screenwidth - 70,
    paddingHorizontal: 10,
    fontSize: screenwidth / 22
  },
  button: {
    flexDirection: 'row',
    width: screenwidth / 2.5,
    height: screenheight / 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: Colors.primaryWhite,
    fontSize: screenwidth / 20,
    fontFamily: 'Lucida-Grande-Bold',
    marginHorizontal: 5
  },
  button2: {
    flexDirection: 'row',
    width: screenwidth / 2.5,
    height: screenheight / 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  exchange: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})
