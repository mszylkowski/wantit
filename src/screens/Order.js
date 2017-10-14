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

import RNFetchBlob from 'react-native-fetch-blob';

export default class Order extends Component {
  static navigationOptions = {
    title: 'WantIt'
  };

  constructor(props){
    super(props);
    this.image = this.props.navigation.state.params.url;
  }
  componentDidMount() {
    RNFetchBlob.fs.readFile(this.image, 'base64')
    .then((data) => {
      console.log("hello");
    });
  }
  render() {
    return (
      <View>
        <Image
          resizeMode="cover"
          style={{height:400}}
          source={{uri: this.props.navigation.state.params.url}}
        />
      </View>
    );
  }
}