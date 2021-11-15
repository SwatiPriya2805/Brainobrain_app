import React from "react";
import { View, ImageBackground, StyleSheet, Text, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

function LoginScreen(){
    return (
        <ImageBackground style={styles.container} source={require('../Assets/background.jpg')}>
           <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../Assets/logo.jpg')}/>
                <Text style={styles.tagLine}>Login</Text>
                {/* <View>
                    <Ionicons name="home" size={32} color="green" />
                     <FontAwesome.Button name="facebook" backgroundColor="#3b5998">
                        Login with Facebook
                    </FontAwesome.Button>
                </View>  */}
           </View>
            {/* <View style={styles.button1}><Text style={styles.signupText}>Sign Up</Text></View> */}
            <View style={styles.button2}><Text style={styles.logInText}>Login</Text></View>
        </ImageBackground>
    );
}
// div ->website, similarly we use View in react native
//View -> UIView(iOS), android.view(android)

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        justifyContent:"flex-end",
        alignItems:"center",
        position:"relative"
    },
    button1:{
        width:"100%",
        height:70,
        backgroundColor:"tomato",
        justifyContent:"center",
        alignItems:"center"
    },
    signupText:{
        textAlign:"center",
        color:"#fff",
        fontSize:24
    },
    button2:{
        width:"100%",
        height:70,
        backgroundColor:"teal", //#04B1DA
        justifyContent:"center",
        alignItems:"center"
    },
    logInText:{
        textAlign:"center",
        color:"#fff",
        fontSize:24
    },
    logoContainer:{
        position:"absolute",
        top:100,
        alignItems:"center"

    },
    logo:{
        width:100,
        height:100,
        borderRadius:50
    },
    tagLine:{
        paddingTop:20,
        fontSize:22,
        color:"tomato",
        fontFamily:"serif"
    }
})
export default  LoginScreen;

