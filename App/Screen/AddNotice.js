import React from "react";
import { Formik } from "formik";
import { View,  StyleSheet, Text, TextInput, Button,TouchableOpacity, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddNotice({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Notice Form</Text>
            </View>
            <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "#fff"
            }]}
            >
                <Formik
                    initialValues={{title:'', description:''}}
                    onSubmit={(values)=>{
                        console.log(values);
                    }}
                >
                    {props=>(
                        <View>
                            <Text style={[styles.text_footer, {
                                color:"#05375a"
                            }]}>Title</Text>
                            <TextInput
                                multiline
                                style={styles.textInput}
                                placeholder='Add title'
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />
                            <Text style={[styles.text_footer, {
                                color:"#05375a"
                            }]}>Description</Text>
                            <TextInput
                                multiline
                                style={styles.textInput}
                                placeholder='Add description'
                                onChangeText={props.handleChange('description')}
                                value={props.values.description}
                            />

                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.addNotice}
                                    onPress={() => navigation.navigate('NoticeScreen')}
                                    //onPress={props.handleSubmit}
                                >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.addNotice}
                                >
                                    <Text style={[styles.textSign, { color:'#fff' }]}>Add</Text>
                                </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>    
            </Animatable.View>
        </View>
    )
}

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
        flex: 3,
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
    textInput: {
        marginTop: 8,
        color: 'black',
        fontSize:15,
        borderWidth:1,
        borderColor:"#ddd",
        borderRadius:6,
        padding:15
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
        marginTop: 50
    },
});