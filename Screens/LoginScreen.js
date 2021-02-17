import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import * as Speech from 'expo-speech'

export default class LoginScreen extends Component{

  constructor(){
    super();
    this.state = {
      email : '',
      password : '',
    }
  }

  loginFunction = async(email, password) => {

    if(!this.state.email){
      alert('Please fill your email')
    }
    if(!this.state.password){
      alert('Please fill your password')
    }
    
    const login = await firebase.auth().signInWithEmailAndPassword(
      email, password
    )
    if(login){
      alert('User logged in successfully');
      this.props.navigation.navigate('HomeScreen');
    }
    
    firebase.database().ref('Users/' + login.user.uid + '/').update({
      'login_email' : this.state.email,
    })

  }

  render(){
    return(
      <View>
        <ImageBackground source = {require('../Images/bg.jpg')} style = {{
          width : '100%',
          height : '100%',
          alignSelf : 'center',
        }}>
          <Image source = {require('../Images/corona.png')} style = {{
            width : 200,
            height : 200,
            alignSelf : 'center',
            marginTop : 20,
            marginBottom : 30
          }}></Image>
          <TextInput onChangeText = {(text) => {
            this.setState({
              email : text.trim()
            })
          }} style = {style.TextInput} placeholder = 'Enter email'></TextInput>
          <TextInput onChangeText = {(text) => {
            this.setState({
              password : text
            })
          }} style = {style.TextInput} placeholder = 'Enter password' secureTextEntry = {true}></TextInput>
          <TouchableOpacity onPress = {() => {
            this.loginFunction(this.state.email, this.state.password);
          }}><Text style = {style.button}> Login </Text></TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const style = StyleSheet.create({
  TextInput : {
    display : 'flex',
    justifyContent : 'center',
    textAlign : 'center',
    fontSize : 20,
    marginTop : 30,
    alignSelf : 'center',
    backgroundColor : 'white',
    borderRadius : 10,
    height : 40,
    width : '80%'
  },

  button : {
    display : 'flex',
    justifyContent : 'center',
    textAlign : 'center',
    fontSize : 23.5,
    marginBottom : 30,
    alignSelf : 'center',
    backgroundColor : 'white',
    borderBottomLeftRadius : 40,
    borderTopRightRadius : 40,
    height : 35,
    width : '50%',
    marginTop : 40
  }
})