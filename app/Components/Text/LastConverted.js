import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import styles from './styles';

const LastConverted = ({ lastUpdated }) => (
  <View
    style={styles.wrapper}>
    <Text
      style={styles.text}>
      Ex-rates updated => {lastUpdated ? moment(lastUpdated)
        .format('ddd DD, MMMM, YYYY') : 'Last time'}
    </Text>
  </View>
);

LastConverted.propTypes = {

  lastUpdated: PropTypes.string,
};
export default LastConverted;