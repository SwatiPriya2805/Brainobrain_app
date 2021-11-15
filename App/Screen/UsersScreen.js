import React,{ useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, FlatList, StyleSheet, Text, TextInput, StatusBar, Platform, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RadioGroup from 'react-native-radio-buttons-group';
import { Formik } from "formik";
import validator from 'validator';
import { UsersRef } from '../../firebase';

  let teacher="false";
  const radioButtonsData = [
    {
      id: '1',
      label: 'Teacher',
      value: 'true',
      color: '#009387',
      selected: false,
    },
    {
      id: '2',
      label: 'Student',
      value: 'false',
      color: '#009387',
      selected: true,
    },
  ];

const Card = ({ id, name, email, onDelete, teacher }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.title}>Name : {name}</Text>
      <Paragraph>Email : {email}</Paragraph>
      {teacher == "true"?
        <Text style={styles.teacher}>Post : Teacher </Text>:
        <Text style={styles.teacher}>Post : Student </Text>
      }
      <View style={styles.removeContainer}>
        <View style={styles.removePostContainer}>
          <FontAwesome5 style={styles.removePost} name="trash" onPress={() => {onDelete(id, name)}} />
        </View>
      </View>
    </View>
  </View>
);

const UsersScreen = () =>{
  
  const navigation = useNavigation();

  const[Users, setUsers] = useState(null);
  const[deleted, setDeleted] = useState(false);
  const[loading,setLoading] = useState(true);
  const[add,setAdd] = useState(false);
  
 const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const onPressRadioButton = radioButtonsArray => {
    console.log(radioButtonsArray);
    if(radioButtonsArray[0].selected){
      teacher="true";
    }
    else{
      teacher="false"
    }
    console.log(teacher);

    setRadioButtons(radioButtonsArray);
  }; 
  
  const fetchUsers = async() => {
      try {
        const users = [];

        await UsersRef
        // firestore()
        // .collection('Users')
        .orderBy('name','asc')
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
        if(loading){
          setLoading(false);
        }

      }catch(e){
        console.log(e);
      }
    }

  useEffect(()=>{
    fetchUsers();
  },[])

  useEffect(()=>{
    fetchUsers();
    setAdd(false);
  },[add]);
  useEffect(() =>{
    fetchUsers();
    setDeleted(false);
  },[deleted]);

  const handleDeletePost = (id, name) =>{
    Alert.alert(
      'Remove user',
      'Are you sure, you want to remove " '+name+' "?',
      [
        {
          text:'Cancel',
          style:'cancel'
        },
        {
          text:'Confirm',
          onPress: () => deletePost(id),
        }
      ],
      {cancelable: false}
    )
  }
  const deletePost = (id) => {
   
    UsersRef
    .doc(id)
    .get()
    .then(documentSnapshot => {
      if(documentSnapshot.exists){
        deletePostById(id);
      }
    })
  }

  const deletePostById = (id) => {
    UsersRef
    .doc(id)
    .delete()
    .then(() =>{
      setDeleted(true)
      Alert.alert('User removed!', 'User has been removed successfully', [
        {text: 'Okay'}
      ])
    })
    .catch(error => alert(error.message))
  }


    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Users</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, {
            backgroundColor: "#fff"
          }]}
        >
          <ScrollView>
         <Formik
            initialValues={{name:'', email:'',teacher:'false'}}
            
            onSubmit={(values)=>{
              if(values.name.trim().length === 0 || values.email.trim().length === 0){
                Alert.alert('Wrong Input!', 'Name or email field cannot be empty.', [
                    {text: 'Okay'}
                ]);
                return;
              }

               if( !validator.isEmail(values.email) ){
                Alert.alert('Wrong Input!','Enter a valid email', [
                    {text: 'Okay'}
                ]);
                return;
              }


                UsersRef
                .add({
                  name:values.name,
                  email:values.email,
                  teacher:teacher
                })
                .then(()=>{
                  Alert.alert(
                    'Added user!',
                    'You have successfully added the user.',
                    [
                      {
                      text:'Ok',
                      onPress : ()=> setAdd(true)
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
                <View style={styles.form}>
                    <Text style={styles.text_footer}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Add name'
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                    />
                    <Text style={styles.text_footer}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Add email'
                        autoCapitalize='none'
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                    />
                    <View style={styles.radiobtn}>
                      <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                        layout="row"
                      />
                    </View>
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
                            onPress={() => navigation.navigate("NoticeScreen")}
                        >
                        <Text style={[styles.textSign, { color: '#009387'}]}>View Notice</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>   

        
          <FlatList
            data={Users}
            renderItem={({item})=>(
              <Card
                id={item.id}
                name={item.name}
                email={item.email}
                teacher={item.teacher}
                onDelete={handleDeletePost}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          </ScrollView>
        </Animatable.View>
        </View>
    )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  radiobtn:{
    marginTop:8
  },
  form:{
    marginHorizontal:10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop:20,
  },
  iconHeaderContainer:{
    position:"relative",
    alignItems:"flex-end",
  },
  title: {
    fontSize: 15,
    color: "#009387"
  },
  card: {
    borderRadius: 8,
    borderWidth: 0.25,
    borderColor: "#82fbfd",
    elevation: 4,
    backgroundColor: "#fff",
    shadowColor: "#009387",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginHorizontal: 2,
    marginVertical: 12
  },
  cardContent: {
    marginHorizontal: 12,
    marginVertical: 5,
  },
  action: {
    flexDirection: 'row',
    marginVertical:15,
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  teacher: {
    fontSize:14
  },
  add: {
    color: 'white',
    fontSize:35,
    fontWeight:"bold",
    marginTop:-44,
    marginRight:10,
    backgroundColor:"#01ab9d",
    elevation:8,
    paddingVertical:6,
    paddingLeft:7,
    paddingRight:6,
    borderRadius:25,
  },
  addIconContainer:{
    position:"absolute",
    alignItems:"flex-end",
    alignContent:"flex-end"
  },
  users:{
    fontSize:25,
    color:"#fff",
    marginTop:-49,
    marginHorizontal:60,
    fontWeight:"bold",
    backgroundColor:"#01ab9d",
    elevation:8,
    paddingVertical:11,
    paddingHorizontal:9,
    borderRadius:25,
  },
  userAccount:{
    color: 'white',
    fontSize:32.5,
    fontWeight:"bold",
    marginTop:-48,
    backgroundColor:"#01ab9d",
    elevation:8,
    paddingVertical:7.5,
    paddingHorizontal:12,
    borderRadius:25,
  },
  removePost:{
    color: '#FF0000',
    opacity:0.75,
    fontSize:18,
    marginTop:-5,
    marginBottom:2
  },
  removeContainer:{
    position:"relative",
    alignItems:"flex-end"
  },
  text_footer: {
    color: 'black',
    fontSize: 16,
    marginTop:14
  },
  textInput: {
    marginTop: 4,
    color: 'black',
    fontSize:14,
    borderWidth:1,
    borderColor:"#009387",
    borderRadius:6,
    paddingVertical:4,
    paddingHorizontal:10
  },
  
  addNotice: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  button: {
    alignItems: 'center',
    marginTop: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});
