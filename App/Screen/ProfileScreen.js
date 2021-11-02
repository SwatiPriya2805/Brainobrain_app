import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View,  StyleSheet, Text, TouchableOpacity, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const signOutHandle = () =>{
        auth
        .signOut()
        .then(() => {
            navigation.replace("SignInScreen")
            console.log("signed out")
        })
        .catch(error => alert(error.message))
    }

    return (
         <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Hello!</Text>
            </View>
            <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "#fff"
            }]}
            >
               <View>
                    <Text style={styles.info_back}>Email: {auth.currentUser?.email}</Text>
                </View>
                
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.addNotice}
                        onPress={() => navigation.navigate("NoticeScreen")}
                        
                    >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.addNotice}
                    >
                        <Text style={[styles.textSign, { color:'#fff' }]}>Go Back</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button1}>
                        <TouchableOpacity
                            style={styles.addNotice}
                            onPress={() => {signOutHandle()}}  
                        >
                        <LinearGradient
                            colors={['#D22B2B', '#DC143C']}
                            style={styles.addNotice}
                        >
                            <Text style={[styles.textSign, { color:'#fff' }]}>Sign Out  <FontAwesome5 style={styles.signIcon} name="sign-out-alt"/></Text>
                        </LinearGradient>
                        </TouchableOpacity>
                    </View>
                 </View>
            </Animatable.View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    name:{
        fontWeight:"bold",
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginBottom:15,
        paddingVertical:30,
        paddingBottom: 5,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16,
        marginTop:14
    },
    addNotice: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button: {
        alignItems: 'center',
        marginTop: 190,
    },
    button1: {
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        width:"100%",
    },
    textSign: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttons:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    info_back:{
        color: '#000',
        marginTop:10,
        fontSize:17
    }
});