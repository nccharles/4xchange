import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { LinearGradient } from "expo";
import styles from './styles';
import { Colors } from '../../Assets/Themes';

const LastConverted = ({ lastUpdated }) => (
  <LinearGradient
    colors={Colors.gradientColors}
    start={{ x: 1.0, y: 0.5 }}
    end={{ x: 0, y: 0.5 }}
    style={styles.wrapper}
  >
    <Text
      style={styles.text}>
      Ex-rates updated => {lastUpdated ? moment(lastUpdated)
        .format('ddd DD, MMMM, YYYY') : 'Last time'}
    </Text>
  </LinearGradient>
);

LastConverted.propTypes = {

  lastUpdated: PropTypes.string,
};
export default LastConverted;