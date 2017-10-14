import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import CameraHome from './screens/CameraHome';
import Order from './screens/Order';

import { StackNavigator } from 'react-navigation';

export default class Main extends Component {
  render() {
    return (
    	<MainStack/>
    );
  }
}

const MainStack = StackNavigator({
  CameraHome: {
    screen: CameraHome,
  },
  Order: {
    screen: Order,
  }
}, {
	navigationOptions: {
    headerMode: 'screen'
  }
});