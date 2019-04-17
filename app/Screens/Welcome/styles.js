import { StyleSheet } from 'react-native';
import { Colors } from '../../Assets/Themes'

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
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
        fontFamily: 'Lucida-Grande-Bold',
    },
    // Text below header
    text: {
        color: Colors.primaryWhite,
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
        fontFamily: 'Lucida-Grande',
    },
});

export default styles