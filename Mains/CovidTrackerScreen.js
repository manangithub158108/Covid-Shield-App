import React, {Component, useReducer} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import LabTrackerScreen from './LabTrackerScreen';
import { ScrollView } from 'react-native-gesture-handler';
// import { Value } from 'react-native-reanimated';
//import LoginScreen from '../Screens/LoginScreen';

export default class CovidTracker extends Component{
    constructor(){
        super();
        this.state = {
            stateName : '',
            totalInfected : 0,
            newInfected : 0,
            recovered : 0,
            newRecovered : 0,
            deceased : 0,
            newDeceased : 0,
            allRegionData : [],
            username : ''
        }
    }

    getAPIdata = async(text) => {

        // fetch function gives us the access to read the data from the api 
        // json function helps to transfer the data between the client (me) and the web 

        const response = await fetch(
            'https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true'
        )
        const responseJson = await response.json();
        const allRegionData = responseJson.regionData;

        allRegionData.map((stateData) => {
            if(this.state.stateName === stateData.region){
                this.setState({
                    totalInfected : stateData.totalInfected,
                    newInfected : stateData.newInfected,
                    recovered : stateData.recovered,
                    newRecovered : stateData.newRecovered,
                    deceased : stateData.deceased,
                    newDeceased : stateData.newDeceased
                })
            }
        })
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
            <View style = {{backgroundColor : '#222831'}}>
                <ScrollView>
                <Text style = {style.header}> Hello {this.state.username} !!</Text>
                <Text style = {style.text}> 
                    Search the states and union territories for covid cases
                </Text>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        stateName : text.trim()
                    })
                }} style = {style.TextInput}></TextInput>
                <TouchableOpacity onPress = {() => {
                    this.getAPIdata(this.state.stateName.trim());
                }}><Text style = {style.button}> Search </Text></TouchableOpacity>
                <Text style = {style.text}> Your state : {this.state.stateName} </Text>
                <Text style = {style.text}> Total infected cases : {this.state.totalInfected} </Text>
                <Text style = {style.text}> New infected cases : {this.state.newInfected} </Text>
                <Text style = {style.text}> New recovered cases : {this.state.newRecovered} </Text>
                <Text style = {style.text}> Deceased cases : {this.state.deceased} </Text>
                <Text style = {style.text}> New Deceased cases : {this.state.newDeceased} </Text>
                <Text style = {style.text}> Recovered cases : {this.state.recovered} </Text>

                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate('LabTrackerScreen');
                }}>
                    <Text style = {style.button1}> Helpline no. </Text>
                </TouchableOpacity>
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
        color : '#eeeeee',
        marginTop : 20,
        marginBottom : 20,
        fontSize : 20,
        paddingHorizontal : 15
    },

    header : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        marginTop : 20,
        marginBottom : 20,
        fontSize : 30,
        paddingHorizontal : 15
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
        fontSize : 23.5,
        marginBottom : 30,
        alignSelf : 'center',
        backgroundColor : '#00adb5',
        borderBottomLeftRadius : 40,
        borderTopRightRadius : 40,
        height : 35,
        width : '50%',
        marginTop : 40,
        color : '#eeeeee'
      },

      button1 : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 23.5,
        marginBottom : 30,
        alignSelf : 'center',
        backgroundColor : '#00adb5',
        borderRadius : 30,
        height : 35,
        width : '50%',
        marginTop : 40,
        color : '#eeeeee'
      }
})