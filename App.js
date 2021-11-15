//https://snack.expo.dev/
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './App/Screen/SignUpScreen';
import SignInScreen from './App/Screen/SignInScreen';
import SplashScreen from './App/Screen/SplashScreen';
import OnboardingScreen from './App/Screen/OnboardingScreen';
import NoticeScreen from './App/Screen/NoticeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNotice from './App/Screen/AddNotice';
import UsersScreen from './App/Screen/UsersScreen';
import ProfileScreen from './App/Screen/ProfileScreen';

const RootStack = createStackNavigator();
const App = () =>{
  const [isFirstLaunch, setFirstLaunch]= React.useState(null);

  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value === null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setFirstLaunch(true);
      }
      else{
        setFirstLaunch(false);
      }
    });

  },[]);


  if( isFirstLaunch=== null){
    return null;
  }
  else if( isFirstLaunch === true){
    return (
      <NavigationContainer >
        <RootStack.Navigator >
          <RootStack.Screen options={{headerShown:false}} name="OnboardingScreen" component={OnboardingScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="SplashScreen" component={SplashScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="SignInScreen" component={SignInScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="SignUpScreen" component={SignUpScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="NoticeScreen" component={NoticeScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="AddNotice" component={AddNotice}/>
          <RootStack.Screen options={{headerShown:false}} name="UsersScreen" component={UsersScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="ProfileScreen" component={ProfileScreen}/>
        </RootStack.Navigator>
      </NavigationContainer>
  ); 
  }
  else{
    return (
      <NavigationContainer >
         <RootStack.Navigator>
          {/* <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen}/>   */}
          {/* <RootStack.Screen options={{headerShown:false}} name="SplashScreen" component={SplashScreen}/> */}
          <RootStack.Screen options={{headerShown:false}} name="SignInScreen" component={SignInScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="SignUpScreen" component={SignUpScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="NoticeScreen" component={NoticeScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="AddNotice" component={AddNotice}/>
          <RootStack.Screen options={{headerShown:false}} name="UsersScreen" component={UsersScreen}/>
          <RootStack.Screen options={{headerShown:false}} name="ProfileScreen" component={ProfileScreen}/>
        </RootStack.Navigator>
      </NavigationContainer>
  ); 
  }

}

export default App;