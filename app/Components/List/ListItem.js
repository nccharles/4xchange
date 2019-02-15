import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import SVGImage from 'react-native-svg-image'

import { styles } from '.';

const screenwidth = Dimensions.get('window').width
const screenheight = Dimensions.get('window').height


class ListItem extends Component {

  static propTypes = {
    hideAvatar: PropTypes.bool,
    roundAvatar: PropTypes.bool,
    svgFiles: PropTypes.bool,
    avatar: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    rightComponentText: PropTypes.string
  }

  render() {
    const { svgFiles, avatar, onPress } = this.props
    return (
      <View>
        <TouchableOpacity style={styles.parent} onPress={onPress} >
          {svgFiles ? (
            <View style={styles.imageContainer}>
              <SVGImage
                style={{ width: screenwidth / 6, height: screenheight / 17 }}
                resizeMode="contain"
                source={{ uri: avatar }}
              />
            </View>
          ) : (
              <View style={styles.imageContainer}>
                <Image style={styles.leftRectangular} resizeMode="stretch" source={avatar} />
              </View>
            )}
          <View style={styles.center}>
            <View style={styles.titleContainer} >
              <Text style={styles.title}>
                {this.props.title}
              </Text>
            </View>
            <View style={styles.subTitleContainer} >
              <Text style={styles.subTitle}>
                {this.props.subtitle}
              </Text>
            </View>
          </View>
          <Ionicons
            name='ios-arrow-forward'
            size={30}
            color='#99A3A4'
            style={{ justifyContent: 'center', alignSelf: 'center' }}
          // color="white"
          />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }
}

export default ListItem;