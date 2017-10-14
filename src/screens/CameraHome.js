import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';

export default class CameraHome extends Component {
  static navigationOptions = {
    title: 'WantIt'
  };

  constructor(props) {
    super(props);
    this.scanned = "";
    this.id = 16;
    this.label = "C";
    this.readings = [];
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality["480p"]}
          onBarCodeRead={(e) => {this.readCode(e)}}>
          <Text style={styles.capture} onPress={(e) => {this.takePicture(e)}}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  readCode(code) {
    if (this.scanned == code) return;
    this.scanned = code;
    this.props.navigation.navigate('Order', {url: code.text});
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => this.goToOrder(data.path))
      .catch(err => console.error(err));
  }
  goToOrder(path) {
    console.log("Pressed button");
    var start = new Date().getTime();
    RNFetchBlob.fs.readFile(path, 'ascii')
    .then((data) => {
      //console.log(data.length + " Bytes");
      start = new Date().getTime() - start;
      console.log("It took " + start + " milliseconds");
      alert("Done! Read " + this.id + " items for " + this.label + " in " + start + " milliseconds");
    })

    return;
    if (this.scanned == path) return;
    this.scanned = path;
    this.props.navigation.navigate('Order', {url: path});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});