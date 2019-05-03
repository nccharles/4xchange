import React from 'react';
import PropTypes from 'prop-types'
import {
  View, Text, Image, TouchableOpacity, Platform, Dimensions
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import more from '../../Assets/Icons/more.png'
import OptionsMenu from "react-native-options-menu";
import styles from './styles'
import { Colors } from '../../Assets/Themes';
const screenWidth = Dimensions.get('window').width
const Header = (props) => {
  const { onPress1, Add, Update, forex } = props

  return (
    <View style={styles.forex}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={onPress1}
          style={{
            marginHorizontal: 10,
            marginTop: 2
          }}>
          <MaterialIcons
            name='arrow-back'
            size={25}
            color='white' />
        </TouchableOpacity>
        <Text style={styles.forexTitle}>{forex}</Text>
        <View style={styles.forexInfo}>
          <MaterialIcons
            name='notifications'
            size={25}
            color={Colors.primary} />
          <OptionsMenu
            button={more}
            buttonStyle={styles.forexOptions}
            destructiveIndex={1}
            options={["Update Info"]}
            actions={[Update]} />
        </View>
      </View>
    </View>
  );
}

Header.propTypes = {
  onPress1: PropTypes.func,
  Add: PropTypes.func,
  Update: PropTypes.func,
  forex: PropTypes.string,
}

export default Header;
