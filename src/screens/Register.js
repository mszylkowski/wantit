import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }
  render() {
    return (
    	<View style={{backgroundColor:'#3498DB', height:'100%', display:'flex', justifyContent:'center', padding:50}}>
        <View style={{padding: 20, borderRadius:5, backgroundColor: '#ffffff', boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
          <Text style={{fontSize:20}}>
            Register
          </Text>
          <TextInput
            placeholder="email"
            underlineColorAndroid="transparent"
            style={{height: 40, borderColor: 'transparent', borderWidth: 1, padding:10, borderRadius: 5, backgroundColor:'#ECF0F1', marginTop:20}}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            style={{height: 40, borderColor: 'transparent', borderWidth: 1, padding:10, borderRadius: 5, backgroundColor:'#ECF0F1', marginTop:20, marginBottom: 20}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />
          <Button
            title="Register"
            style={{height:40}}
            color="#0513cd"
            onPress={() => {this.register()}}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{color:'white', fontSize:15, textAlign:'right'}}
            onPress={() => {this.props.navigation.goBack()}}
          >Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  register() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage, ToastAndroid.SHORT);
    }).then((e) => {
      this.sendEmailVerification();
    });
  }

  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('Email Verification Sent!');
    });
  }
}