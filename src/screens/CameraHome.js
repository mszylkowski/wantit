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

export default class CameraHome extends Component {
  static navigationOptions = {
    title: 'WantIt'
  };

  constructor(props) {
    super(props);
    this.scanned = true;
  }

  componentDidMount() {
    this.scanned = false;
  }

  componentWillUnmount() {
    this.scanned = false;
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
          captureQuality={Camera.constants.CaptureQuality["720p"]}
          onBarCodeRead={this.readCode.bind(this)}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  readCode(code) {
    if (this.scanned) return;
    this.scanned = true;
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
    if (this.scanned) return;
    this.scanned = true;
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