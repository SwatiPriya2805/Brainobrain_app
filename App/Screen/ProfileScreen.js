import { useNavigation } from '@react-navigation/core';
import React,{useEffect, useState} from 'react'
import { View,  StyleSheet, Text, TouchableOpacity, FlatList, Paragraph} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../firebase';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { UsersRef } from '../../firebase';

const Card = ({ name, email, teacher }) => (
  <View style={styles.card}> 
    <View style={styles.cardContent}>
    <Text style={styles.title}>Name : <Text style={styles.values}>{name}</Text></Text>
    <Text style={styles.title}>Email : <Text style={styles.values}>{email}</Text></Text>
    {teacher == "true"?
        <Text style={styles.title}>Post : <Text style={styles.values}>Teacher</Text> </Text>:
        <Text style={styles.title}>Post : <Text style={styles.values}>Student</Text> </Text>
    }
    </View>    
  </View>
);
const ProfileScreen = () => {

    const navigation = useNavigation();
    const [emailId,setEmailId] = useState(auth.currentUser?.email);
    const[Users, setUsers] = useState(null);
    const[loading,setLoading] = useState(true);
    const[count, setCount] = useState(0);
    let emailID= auth.currentUser?.email;
    
    const signOutHandle = () =>{
        auth
        .signOut()
        .then(() => {
            navigation.replace("SignInScreen")
            console.log("signed out")
        })
        .catch(error => alert(error.message))
    }
    const fetchEmail = async() =>{
    try{
      await 
      setEmailId(auth.currentUser?.email);
      emailID = auth.currentUser?.email;
      fetchUsers(emailID);
    }catch(e){
        console.log(e);
      }
  }

    const fetchUsers = async(emailid) => {
      try {
        
        const users = [];
        await UsersRef
        .where("email", "==", emailid)
        .where("email","!=", null)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            const { name, email, teacher} = doc.data();
            users.push({
              id: doc.id,
              name:name,
              email:email,
              teacher:teacher
            });
          })
        })
        setUsers(users);
        setCount(users.length);
        if(loading){
          setLoading(false);
        }
        
      
      }catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
        fetchEmail();
    },[])

    return (
         <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Hello!</Text>
            </View>
            {loading?
            <Feather name="loader"  style={[styles.loader,styles.footer]}/>:
            <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "#fff"
            }]}
            >
                {count > 0?
                    <FlatList
                        data={Users}
                        renderItem={({item})=>(
                        <Card
                            id={item.id}
                            name={item.name}
                            email={item.email}
                            teacher={item.teacher}
                        />
                        )}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />:
                    <Text style={styles.titles}>Email : <Text style={styles.values}>{auth.currentUser?.email}</Text></Text>
                }
                
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
            }   
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
        marginTop: 30,
    },
    title:{
        fontSize:16,
        fontWeight:"500",
        margin:2
    },
    titles:{
        fontSize:16,
        fontWeight:"500",
        marginHorizontal:2,
        marginBottom:80
    },
    values:{
        fontSize:16,
        color:"#009387"
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
    },
    loader:{
        fontSize:40,
        color:"#009387",
        textAlign:"center",
        textAlignVertical:"center"
    },
});