import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import CovidTest from './Mains/CovidTest';
import CovidTracker from './Mains/CovidTrackerScreen';
// import VaccinationTracker from './Mains/VaccinationTracker';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';
import LabTrackerScreen from './Mains/LabTrackerScreen';
// import ResultScreen from './Mains/ResultScreen';

export default class App extends Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const BottomTabNavigator = createBottomTabNavigator({
  SignupScreen : {
    screen : SignupScreen,
    navigationOptions : {
      tabBarIcon : <Image source = {require('./Images/register.png')} style = {{
        width : 30,
        height : 30,
        alignSelf : 'center'
      }}></Image>,
      tabBarLabel : 'Signup Screen'
    }
  },
  LoginScreen : {
    screen : LoginScreen,
    navigationOptions : {
      tabBarIcon : <Image source = {require('./Images/login.png')} style = {{
        width : 30,
        height : 30,
        alignSelf : 'center'
      }}></Image>,
      tabBarLabel : 'Login Screen'
    }}
})

const StackNavigator = createStackNavigator({
  BottomTabNavigator : {
    screen : BottomTabNavigator,
    navigationOptions : {
      headerTitle : 'Signup And Login Screen',
      headerTitleAlign : 'center'
    }
  },

  HomeScreen : {
    screen : HomeScreen,
    navigationOptions : {
      headerTitle : 'HomeScreen',
      headerTitleAlign : 'center'
    }
  },

  CovidTracker : {
    screen : CovidTracker,
    navigationOptions : {
      headerTitle : 'Covid Tracker Screen',
      headerTitleAlign : 'center'
    }
  },

  LabTrackerScreen : {
    screen : LabTrackerScreen,
    navigationOptions : {
      headerTitleAlign : 'center',
      headerTitle : 'Lab Tracker'
    }
  },

  CovidTest : {
    screen : CovidTest,
    navigationOptions : {
      headerTitle : 'Covid Testing Quiz',
      headerTitleAlign : 'center'
    }
  },

  
})

const SwitchNavigation = createSwitchNavigator({
  SplashScreen : {screen : SplashScreen},
  StackNavigator : {screen : StackNavigator}
})

const AppContainer = createAppContainer(SwitchNavigation);