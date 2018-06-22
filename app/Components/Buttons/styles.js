import { StyleSheet, Dimensions } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Assets/Themes'

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


const styles = StyleSheet.create({

  actionButtonIcon: {
    color: 'white',
  },
  button: {
    backgroundColor: Colors.dark,
    marginVertical: 20,
    height: screenheight/16,
    borderRadius: 5,
    width: screenwidth -50,
    alignContent : 'center',
    justifyContent: 'center',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'bold',
    paddingHorizontal: 5
  },
  roundButton: {
    position: 'absolute',
    right: 40,
    bottom: 30,
    backgroundColor: Colors.dark,
    width: screenwidth/5,
    height: screenwidth/5,
    borderRadius: screenwidth/5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  image: {
    tintColor: 'white',
  },
  buttonContainer:{
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.dark,
    borderRadius: 5,
    height: screenheight/16,
    width: screenwidth -30,
    alignSelf: 'center',
    elevation: 3
  },
  headerBtn: {
    marginRight: 20
  },
  headerImg: {
    tintColor: 'white',
    width: screenwidth/16,
    height: screenwidth/16,
  }
});

export default styles;