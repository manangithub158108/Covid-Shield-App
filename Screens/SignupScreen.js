import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';

export default class SignupScreen extends Component{

  constructor(){
    super();
    this.state = {
      first_name : '',
      last_name : '',
      address : '',
      contact_no : 0,
      email : '',
      password : '',
      confirmPassword : ''
    }
  }

  Signup = async() => {

    if(!this.state.first_name){
      alert('Please fill your first name field')
    }
    if(!this.state.last_name){
      alert('Please fill your last name field')
    }
    if(!this.state.contact_no){
      alert('Please fill your contact_no field')
    }
    if(!this.state.email){
      alert('Please fill your email field')
    }
    if(!this.state.password){
      alert('Please fill your password field')
    }
    if(!this.state.confirmPassword){
      alert('Please fill your confirm password field')
    }

    const Signup = await firebase.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.confirmPassword
    )
    if(Signup){
      firebase.database().ref('Users/' + Signup.user.uid + '/').update({
        first_name : this.state.first_name,
        last_name : this.state.last_name,
        contact_no : this.state.contact_no,
        signup_email : this.state.email
      })

      alert('The user successfully signed up');
      this.props.navigation.navigate('LoginScreen');
    }
  }
  
  render(){
    return(
      <View>
        <ImageBackground source = {require('../Images/bg1.jpg')} style = {{
          width : '100%',
          height : '100%',
          alignSelf : 'center',
        }}>
          <Image source = {require('../Images/corona2.png')} style = {{
            width : 170,
            height : 170,
            alignSelf : 'center',
            marginTop : 10,
            marginBottom : 10
          }}></Image>

          <TextInput onChangeText = {(text) => {
            this.setState({
              first_name : text.trim().toLowerCase()
            })
          }} 
          style = {style.TextInput} 
          placeholder = 'Enter first name'>
          </TextInput>

          <TextInput onChangeText = {(text) => {
            this.setState({
              last_name : text.trim().toLowerCase()
            })
          }} style = {style.TextInput} placeholder = 'Enter last name'></TextInput>

          <TextInput onChangeText = {(text) => {
            this.setState({
              contact_no : text.trim()
            })
          }} style = {style.TextInput} placeholder = 'Enter contact no'></TextInput>

          <TextInput onChangeText = {(text) => {
            this.setState({
              email : text.trim()
            })
          }} style = {style.TextInput} placeholder = 'Enter email'></TextInput>

          <TextInput onChangeText = {(text) => {
            this.setState({
              password : text
            })
          }} style = {style.TextInput} placeholder = 'Enter password'
          secureTextEntry = {true}>
          </TextInput>

          <TextInput onChangeText = {(text) => {
            this.setState({
              confirmPassword : text
            })
          }} style = {style.TextInput} placeholder = 'Enter confirm password' 
          secureTextEntry = {true}>
          </TextInput>

          <TouchableOpacity onPress = {() => {
            this.Signup();
          }}><Text style = {style.button}> Signup </Text></TouchableOpacity>
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