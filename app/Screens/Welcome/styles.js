import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Assets/Themes'
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    //Swiper
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    // Header styles
    header: {
        color: Colors.primaryWhite,
        fontSize: width / 15,
        marginVertical: 15,
        fontFamily: 'Lucida-Grande-Bold',
    },
    // Text below header
    text: {
        color: Colors.primaryWhite,
        fontSize: width / 22,
        marginHorizontal: 40,
        textAlign: 'center',
        fontFamily: 'Lucida-Grande',
    },
});

export default styles