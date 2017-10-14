import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

export default class Order extends Component {
  static navigationOptions = {
    title: 'WantIt'
  };
  render() {
    return (
      <View>
        <Image
          resizeMode="cover"
          style={{height:400, position:'center center'}}
          source={{uri: this.props.navigation.state.params.url}}
        />
      </View>
    );
  }
}