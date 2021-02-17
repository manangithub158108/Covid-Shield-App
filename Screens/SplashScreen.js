import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class SplashScreen extends Component{
  render(){
    return(
      <View>
        <ImageBackground source = {require('../Images/bg2.jpg')} style = {{
            width : '100%',
            height : '100%',
            alignSelf : 'center',marginTop : 30
        }}>
            <Text style = {style.text}>Want to start the journey ? Click below to proceed</Text>
            <TouchableOpacity onPress = {() => {
                this.props.navigation.navigate('SignupScreen');
            }}><Text style = {style.textButton}> Go </Text></TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const style = StyleSheet.create({
    text : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 30,
        marginTop : 20,
        marginBottom : 30,
        color : 'yellow'
    },

    textButton : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 30,
        marginBottom : 30,
        alignSelf : 'center',
        backgroundColor : '#ffcc29',
        color : '#007965',
        borderRadius : 20
    },
})