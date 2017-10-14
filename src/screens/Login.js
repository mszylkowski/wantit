import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }
  render() {
  if (this.state.loading) {
      return (
        <View style={{backgroundColor:'#3498DB', height:'100%', display:'flex', justifyContent:'center', padding:50}}>
          <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large"
        color="white"
      />
        </View>
        );
    }
    return (
    	<View style={{backgroundColor:'#3498DB', height:'100%', display:'flex', justifyContent:'center', padding:50}}>
        <View style={{padding: 20, borderRadius:5, backgroundColor: '#ffffff', boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
          <Text style={{fontSize:20}}>
            Login
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
            title="Log in"
            style={{height:40}}
            color="#0513cd"
            onPress={() => {this.login()}}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{color:'white', fontSize:15, textAlign:'right'}}
            onPress={() => {this.props.navigation.navigate('Register')}}
          >Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  login() {
  this.setState({
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
    this.setState({
      loading: false,
      });
  }
}