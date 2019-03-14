import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const ListItem = ({
  title,
  onPress
}) => (
    <TouchableHighlight style={styles.row} onPress={onPress}>
      {/* <View > */}
      <View style={styles.titleContainer} >
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
      <View style={styles.subTitleContainer} >
        <Text style={styles.subTitle}>
          {subtitle}
        </Text>
      </View>
      {/* </View> */}
    </TouchableHighlight>
  );

ListItem.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onPress: PropTypes.func,
  checkmark: PropTypes.bool,
  selected: PropTypes.bool,
  visible: PropTypes.bool,
  customIcon: PropTypes.element,
  iconBackground: PropTypes.string,
};

export default ListItem;