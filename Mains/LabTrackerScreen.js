import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Card} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import CovidLabs from './CovidLabsList';
import CovidTracker from './CovidTrackerScreen'
import contact_details from './helplineNo';
import firebase from 'firebase'

export default class LabTrackerScreen extends Component{

    constructor(){
        super();
        this.state = {
            userLocation : '',
            state_name : '',
            helpline_no : '',
            govCovidLab : '',
            privateCovidLab : '',
            username : ''
        }
    }

    get_username = () => {
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref('Users/' + currentUser.uid + '/').get().then((user_data) => {
            const userData = user_data.val();
            this.setState({
                username : userData.first_name
            })
        })
    }

    filterFunctionForHelplineNo = () => {
        contact_details.map((arrayValue) => {
            if(this.state.state_name === arrayValue.state){
                this.setState({
                    helpline_no : arrayValue.helpline_number
                })
            }
        })
    }

    filterFunctionForCovidLabs = () => {
        CovidLabs.map((arrayValue) => {
            if(this.state.state_name === arrayValue.state_or_UT){
                this.setState({
                    govCovidLab : arrayValue.government_labs,
                    privateCovidLab : arrayValue.private_labs
                })
            }
        })
    }

    componentDidMount = () => {
        this.get_username();
    }

render(){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>
                <ScrollView>
                <Text style = {style.header}> Hello {this.state.username} !! </Text>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        state_name : text.trim()
                    })
                }} placeholder = 'Enter State name' style = {style.TextInput} placeholderTextColor = "#eeeeee"></TextInput>
                <TouchableOpacity onPress = {() => {
                    this.filterFunctionForHelplineNo();
                }}>
                    <Text style = {style.button}> Click here for helpline number </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {
                    this.filterFunctionForCovidLabs();
                }}>
                    <Text  style = {style.button}> Click here to know the covid labs </Text>
                </TouchableOpacity>

                <Text style = {style.text}> Helpline no. ----{'>'} {this.state.helpline_no} </Text>
                <Text style = {style.text}> Government labs suitable for Covid - 19 testing  --{'>'}</Text>
                <FlatList data = {this.state.govCovidLab} renderItem = {({item}) => <Text style = {style.text1}> {item.name} </Text>}></FlatList>
                <Text style = {style.text}> Private labs suitable for Covid - 19 testing  --{'>'}</Text>
                <FlatList data = {this.state.privateCovidLab} renderItem = {({item}) => <Text style = {style.text1}> {item.name} </Text>}></FlatList>
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    text : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'left',
        color : '#393e46',
        marginTop : 25,
        marginBottom : 20,
        fontSize : 20,
        paddingHorizontal : 15,
        fontWeight : '800',
        paddingLeft : 15,
        backgroundColor : '#a3f7bf',
        paddingVertical : 5
    },

    header : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        marginTop : 25,
        marginBottom : 20,
        fontSize : 30,
        paddingHorizontal : 15,
        fontWeight : '800'
    },


    text1 : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'left',
        color : '#eeeeee',
        marginTop : 15,
        marginBottom : 20,
        fontSize : 20,
        paddingHorizontal : 15,
        paddingLeft : 45
    },

    TextInput : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 20,
        marginTop : 30,
        alignSelf : 'center',
        backgroundColor : '#393e46',
        borderRadius : 10,
        height : 40,
        width : '80%',
        color : '#eeeeee'
    },

      button : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 18,
        marginBottom : 10,
        alignSelf : 'center',
        backgroundColor : '#00adb5',
        borderBottomLeftRadius : 40,
        borderTopRightRadius : 40,
        height : 35,
        width : '90%',
        marginTop : 40,
        color : '#eeeeee'
      }
})
