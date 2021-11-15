import React from "react";
import { Formik } from "formik";
import { View,  StyleSheet, Text, TextInput, Button,TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient';
import { BrainobrainRef } from "../../firebase";
export default function AddNotice({navigation}){
    const navigateNoticeScreen = () => {
        navigation.navigate('NoticeScreen', {
            click: Math.floor(Math.random() * 10000),
        });
    }
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
                        if(values.title.trim().length === 0 || values.description.trim().length === 0){
                            Alert.alert('Wrong Input!', 'Title or Description field cannot be empty.', [
                                {text: 'Okay'}
                            ]);
                            return;
                        }

                        BrainobrainRef
                        .add({
                            title:values.title,
                            description:values.description,
                            postTime: moment().toDate()
                        })
                        .then(()=>{
                            Alert.alert(
                                'Added notice!',
                                'You have successfully added the notice.',
                                [
                                    {
                                        text:'Add more',
                                        onPress : ()=> navigation.navigate('AddNotice')
                                    },
                                    {
                                        text:'Ok',
                                        onPress: () => navigateNoticeScreen()
                                    }
                                ],
                                {cancelable: false}
                            );

                        })
                        .catch((error) => {
                            Alert.alert(error.message)
                        })
                       
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
                                    onPress={props.handleSubmit}
                                >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.addNotice}
                                >
                                    <Text style={[styles.textSign, { color:'#fff' }]}>Add</Text>
                                </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={[styles.addNotice,{
                                        borderColor: '#009387',
                                        borderWidth: 1,
                                        marginTop: 18,
                                    }]}
                                    onPress={() => navigation.navigate("NoticeScreen", {
                                        click: Math.floor(Math.random() * 10000),
                                    })}
                                >
                                <Text style={[styles.textSign, { color: '#009387'}]}>Go Back</Text>
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
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});