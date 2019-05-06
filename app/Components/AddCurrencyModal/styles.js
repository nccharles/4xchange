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
    borderRadius: Metrics.smallMargin
  },
  currencyBtnTxt: {
    color: Colors.primaryWhite,
    fontSize: screenwidth / 20,
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
    height: 40,
    borderBottomWidth: 2,
    borderColor: Colors.lightGray,
    width: screenwidth - 70,
    paddingHorizontal: 10,
    borderRadius: Metrics.smallMargin,
    fontSize: screenwidth / 22
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    width: screenwidth / 2.5,
    height: 40,
    borderRadius: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  btnTxt: {
    color: Colors.primaryWhite,
    fontSize: screenwidth / 20,
    fontFamily: 'Lucida-Grande-Bold',
    marginHorizontal: 5
  },
  button2: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    width: screenwidth / 2.5,
    height: 40,
    borderRadius: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    marginLeft: 40
  }
})
