import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Button
} from 'react-native';
import CameraHome from './screens/CameraHome';
import Order from './screens/Order';
import Login from './screens/Login';
import Register from './screens/Register';

import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyDc-iBOBKUxwScQVZwEkQqudcRrv9OOyfs",
	authDomain: "hackgt-13ee8.firebaseapp.com",
	databaseURL: "https://hackgt-13ee8.firebaseio.com",
	projectId: "hackgt-13ee8",
	storageBucket: "",
	messagingSenderId: "225762772629"
};
firebase.initializeApp(config);

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {user: null};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
		  this.setState({user: user});
		});
	}

  render() {
  	if (this.state.user != null && this.state.user.emailVerified) {
  		return (<MainStack/>);
  	} else if (this.state.user != null) {
  		return (
  			<View style={{display:'flex', justifyContent:'center', padding: 50, alignItems:'center', height:'100%', backgroundColor:'#F25560'}}>
  				<Text
  					style={{color:'white', fontSize:18, textAlign:'center'}}>
  					Open the link on your email to verify your account
  				</Text>
  				<Image source={require('./res/verify_email.jpg')} style={{margin: 20}}/>
  				<Button
  					color="grey"
  					title="Check verification"
  					onPress={() => {
  						firebase.auth().currentUser.reload().then((e) => {
  							this.setState({user:firebase.auth().currentUser.emailVerified});
  						});
  					}}
  				/>
  				<Button
  					color="grey"
  					title="Resend email"
  					onPress={() => {
  						this.sendEmailVerification();
  					}}
  				/>
  			</View>
  			);
  	} else {
  		return (
    		<LoginStack/>
   		);
  	}
  }

  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('Email Verification Sent!');
    });
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

const LoginStack = StackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  }
}, {
	navigationOptions: {
    header: null
  }
});