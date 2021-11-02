// important imports for the file
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';

export default function App() {
  const {landscape}= useDeviceOrientation();
  console.log(useDeviceOrientation())
  return (
    // use  SafeAreaView instead of View
    < View style={[styles.back,styles.container,{height:landscape? "100%":"30%"}]}>
      <Text style={styles.baseText}>hello</Text>
      <StatusBar style="auto" />
    </ View>
  );
}

// styling for the whole page
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#fff",
    padding:4,
  },
  back:{
    backgroundColor:"tomato",width:"100%",
  }

});

// // old js function syntax
// const square = function(number){
//   return number*number;
// }

// // arrow function  -> ES2015 functions
// const square = number => number*number; // one parameter
// const multiply = (number, number1) => number*number1; //2 parameters or more parameters

//  <View style={{flex:1,flexDirection: "column-reverse"}}>
  //     < View style={{
  //       backgroundColor: "tomato", width: "100%", height: "30%",
        
  //     }}>

  //     </View >
  //     <View style={{
  //       backgroundColor: "teal", width:"100%", height: "30%",
  //     }
  //     } ></View>
  //   </View>