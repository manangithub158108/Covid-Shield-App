import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import firebase from 'firebase'

export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state = {
            username : ''
        }
    }

    get_username = () => {
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref('Users/' + currentUser.uid + '/').get().then((data) => {
            const userData = data.val();
            this.setState({
                username : userData.first_name
            })
        })
    }

    componentDidMount = () => {
        this.get_username();
    }

    render(){
        return(
            <View style = {{backgroundColor : '#61b15a', height : '100%'}}>
                <Text style = {style.text}> Hello {this.state.username} !!</Text>
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate('CovidTracker');
                }}><Text style = {style.buttons}> Covid cases Tracker </Text></TouchableOpacity>

                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate('LabTrackerScreen');
                }}><Text style = {style.buttons}> Lab Tracker  </Text></TouchableOpacity>

                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate('CovidTest');
                }}><Text style = {style.buttons}> Covid Testing Quiz </Text></TouchableOpacity>
                <Image source = {require(
                    '../Images/Handwashing.png'
                )} style = {{
                    alignSelf : 'center',
                    width : 300,
                    height : 300,
                    marginTop : 30,
                    marginBottom : 30
                }}/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    buttons : {
        display : 'flex',
        justifyContent : 'center',
        backgroundColor : '#adce74',
        color : "white",
        borderRadius : 30,
        marginTop : 20,
        alignSelf : 'center',
        width : '80%',
        height : 45,
        fontSize : 25,
        textAlign : 'center',
        marginBottom : 10
    },

    text : {
        display : 'flex',
        justifyContent : 'center',
        marginTop : 20,
        marginBottom : 30,
        alignSelf : 'center',
        fontSize : 30,
        textAlign : 'center',
        color : 'white'
    }
})