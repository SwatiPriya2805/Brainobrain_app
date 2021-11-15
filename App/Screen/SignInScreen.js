import { useNavigation} from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { auth } from '../../firebase';
import validator from 'validator';
import {Permissions, Notifications} from 'expo';
import { UsersRef } from '../../firebase';


const SignInScreen = () => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [loading,setLoading] = useState(true);

    const navigation = useNavigation()

    
    registerForPushNotificationsAsync = async (user) => {
        const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if(existingStatus !== 'granted'){
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        }
        if(finalStatus !== 'granted'){
        return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        // if (Platform.OS === 'android') {
        // Notifications.setNotificationChannelAsync('default', {
        //     name: 'default',
        //     importance: Notifications.AndroidImportance.MAX,
        //     vibrationPattern: [0, 250, 250, 250],
        //     lightColor: '#FF231F7C',
        // });
        // }

        var updates = {}
        updates['/Token'] = token
        UsersRef.child(user.email).update(updates)
    }

    const fetchUser = async() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace("NoticeScreen")
            }
        })
        if(loading){
            let timer = setInterval(() => setLoading(false), 1500);
        }
        return unsubscribe;
    }

    const user = async() => {
        try{
            await
            fetchUser()
        }catch(e){
            console.log(e);
        } 
    }

    useEffect(()=>{
        user();
    },[])

    const textInputChange = (val) => {
        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (email, password) =>{
        if ( data.email.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if( !validator.isEmail(data.email) ){
            Alert.alert('Wrong Input!','Enter a valid email', [
                {text: 'Okay'}
            ]);
            return;
        }

        if( data.password.length < 8){
            Alert.alert('Wrong Input!','Enter a valid 8 character password',[
                {text: 'Okay'}
            ]);
            return;
        }

        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('logged in with : ',user.email);
            registerForPushNotificationsAsync(user);

        })
        .catch(error => alert(error.message))
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        {loading?
            <View style={styles.footer}>
                <Image style={styles.img} source={require('../Assets/boarding1.png')}/>
                <Text style={styles.introText}>Welcome to the App.</Text>  
            </View>:
            <Animatable.View 
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: "#fff"
                }]}
            >
                <ScrollView>
                <Text style={[styles.text_footer, {
                    color:"#05375a"
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color="black"
                        size={20}
                    />
                    <TextInput 
                        placeholder="hello@gmail.com"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: "black"
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                </View>
                { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Email must be atleast 10 characters long.</Text>
                </Animatable.View>
                }
                

                <Text style={[styles.text_footer, {
                    color: "#05375a",
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color="black"
                        size={20}
                    />
                    <TextInput 
                        placeholder="password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: "black"
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ? 
                        <Feather 
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather 
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be atleast 8 characters long.</Text>
                </Animatable.View>
                }
                
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {loginHandle( data.email, data.password )}}        
                    >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.info_text}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </Animatable.View>
        }
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    footer: {
        flex: Platform.OS === 'ios' ? 2 : 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: 'black',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    info_text:{
        color: '#009387',
        marginTop:55
    },
    img:{
        maxWidth:"100%",
        height:"50%"
    },
    introText:{
        textAlign:"center",
        fontSize:20,
        color:"#009387"
    }
  });