import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


const styles = StyleSheet.create({

  actionButtonIcon: {
    color: Colors.primaryWhite,
  },
  button: {
    backgroundColor: Colors.primaryDark,
    marginVertical: 20,
    height: screenheight / 16,
    borderRadius: 5,
    width: screenwidth - 30,
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.primaryWhite,
    fontSize: 18,
    fontFamily: 'Lucida-Grande-Bold',
    paddingHorizontal: 5
  },
  chatbutton: {
    width: screenwidth / 6,
    height: screenwidth / 6,
    borderRadius: screenwidth / 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    elevation: 1
  },
  roundButton: {
    position: 'absolute',
    right: 40,
    bottom: 30,
    backgroundColor: Colors.primaryDark,
    width: screenwidth / 5,
    height: screenwidth / 5,
    borderRadius: screenwidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  image: {
    tintColor: Colors.primaryWhite,
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: screenheight / 16,
    height: screenheight / 20,
    width: screenwidth - 30,
    alignSelf: 'center',
    elevation: 1
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  headerBtn: {
    marginRight: 20
  },
  headerImg: {
    tintColor: Colors.primaryWhite,
    width: screenwidth / 16,
    height: screenwidth / 16,
  }
});

export default styles;