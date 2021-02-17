import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Touchable, TouchableOpacityBase} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import QuestionBank from './QuestionBank';
import { ScrollView } from 'react-native-gesture-handler';

export default class CovidTest extends Component{

    constructor(){
        super();
        this.state = {
            Questions : '',
            questionSequenceNumber : 0,
            score : 0,
            username : '',
            result : '',
            isButtonPressed : false,
            disable : false,
            questionCount : 0
        }
    }

    displayResult = () => {
        if(this.state.score === 8){
            this.setState({
                result : 'Its an alarming situation !! kindly consult your doctor.'
            })
        }
        if(this.state.score === 7){
            this.setState({
                result : 'Its an alarming situation !! kindly consult your doctor.'
            })
        }
        if(this.state.score === 6){
            this.setState({
                result : 'You should be keeping a vigile on your health and please follow all the important precautionary measures of covid - 19'
            })
        }
        if(this.state.score === 5){
            this.setState({
                result : 'You should be keeping a vigile on your health and please follow all the important precautionary measures of covid - 19'
            })
        }
        if(this.state.score === 4){
            this.setState({
                result : 'You should be keeping a vigile on your health and please follow all the important precautionary measures of covid - 19'
            })
        }
        if(this.state.score === 3){
            this.setState({
                result : 'There is no need to worry, you just need to follow all the important precautionary measures of covid - 19'
            })
        }
        if(this.state.score === 2){
            this.setState({
                result : 'There is no need to worry, you just need to follow all the important precautionary measures of covid - 19'
            })
        }
        if(this.state.score === 1){
            this.setState({
                result : 'There is no need to worry, you just need to follow all the important precautionary measures of covid - 19'
            })
        }
    }

    get_questions = () => {
        this.setState({
            questionSequenceNumber : this.state.questionSequenceNumber + 1,
        })
        if(this.state.questionCount > 7){
            this.displayResult();
        }else{
            const question = QuestionBank[this.state.questionSequenceNumber].Question
            this.setState({
                Questions : question,
                questionCount : this.state.questionCount + 1
            }) 
        }
    }

    componentDidMount = () => {
        this.get_questions();
    }

    render(){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>
                <ScrollView>
                <Text style = {style.text}> Question : {this.state.questionCount} </Text>
                <Text style = {style.Question}> {this.state.Questions} </Text>

               <TouchableOpacity onPress = {() => {
                 this.setState({
                     score : this.state.score + 1
                 })
                   this.get_questions();
               }} disabled = {this.state.disable}>
                   <Text style = {style.Yesbutton}> Yes </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress = {() => {
                   this.get_questions();
               }}>
                   <Text style = {style.NoButton}> No </Text>
               </TouchableOpacity>
               <Text style = {style.text}> Your score of the test is {this.state.score} </Text>
               <Text style = {style.text}> According to this result {this.state.result} </Text>
               </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    text : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        marginTop : 20,
        marginBottom : 10,
        fontSize : 20
    },

    Question : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#222831',
        marginTop : 20,
        marginBottom : 20,
        fontSize : 25,
        backgroundColor : '#00adb5',
        width : '80%',
        height : 200,
        alignSelf : 'center',
        borderRadius : 40,
        textAlignVertical : 'center'
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

      Yesbutton : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 20,
        marginBottom : 10,
        alignSelf : 'center',
        backgroundColor : '#393e46',
        borderBottomLeftRadius : 40,
        borderTopRightRadius : 40,
        height : 40,
        width : '90%',
        marginTop : 30,
        color : '#eeeeee',
        paddingBottom : 10
      },

      NoButton : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 20,
        marginBottom : 10,
        alignSelf : 'center',
        backgroundColor : '#393e46',
        borderBottomLeftRadius : 40,
        borderTopRightRadius : 40,
        height : 40,
        width : '90%',
        marginTop : 10,
        color : '#eeeeee',
        paddingBottom : 10,
        marginBottom : 30
      },

      checkResult : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        fontSize : 20,
        marginBottom : 10,
        alignSelf : 'center',
        backgroundColor : '#393e46',
        borderBottomLeftRadius : 40,
        borderTopRightRadius : 40,
        height : 40,
        width : '90%',
        marginTop : 10,
        color : '#eeeeee'
      },
})