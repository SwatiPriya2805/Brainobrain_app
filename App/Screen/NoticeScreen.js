import React,{ useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, FlatList, StyleSheet, Text, TextInput, StatusBar, Platform, Alert, Image, RefreshControl, ScrollView} from 'react-native';
import { Paragraph } from 'react-native-paper';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BrainobrainRef } from '../../firebase';
import { auth } from '../../firebase';
import { UsersRef } from '../../firebase';

const Card = ({ id, postedBy, title, description, onDelete,postTime, teacher }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.dateTime}>{moment(postTime.toDate()).fromNow()} </Text>
      <Text style={styles.postByContainer}><Text style={styles.postedBy}>{postedBy}</Text> posted </Text>
      <Text style={styles.title}>{title}</Text>
      <Paragraph>{description}</Paragraph>
      {teacher == "true"?
      <View style={styles.removeContainer}>
        <View style={styles.removePostContainer}>
          <FontAwesome5 style={styles.removePost} name="trash" onPress={() => {onDelete(id)}} />
        </View>
      </View>:null}
    </View>
  </View>
);


const CardWarning = () => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Image style={styles.img} source={require('../Assets/boarding1.png')}/>
      <Text style={styles.errorText}>Oops! You are not yet added to the classroom.</Text>
      <Text style={styles.errorSubText}>Contact your teacher</Text>
    </View>
  </View>
);

const NoticeScreen = ({route}) =>{
  const {click}  = route.params || 0;
  let emailID;
  const navigation = useNavigation();
  const [emailId, setEmailId] = useState(emailID); 
  const [teacher, setTeacher] = useState("false");
  const [name, setName] = useState('');
  const [Brainobrain, setBrainobrain] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading,setLoading] = useState(true);
  const [Users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [clicked, setClicked] = useState(true);
  
  const onRefreshing =() =>{
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  }
  
  const fetchEmail = async() =>{
    try{
      await 
      setEmailId(auth.currentUser?.email);
      emailID = auth.currentUser?.email;
      fetchUser(emailID);
      fetchPosts();
    }catch(e){
        console.log(e);
      }
  }

  const fetchUser = async(emailid) => {
    try {
      const users = [];
    
      await UsersRef
      .where("email", "==",emailid)
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
      if(users.length > 0){
        setTeacher(users[0].teacher);
        setName(users[0].name);
      }
      
    }catch(e){
      console.log(e);
    }
  }

  const fetchPosts = async() => {
    try {
      const brainobrain = [];

      await BrainobrainRef
      // firestore()
      // .collection('Brainobrain')
      .orderBy('postTime','desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const { postedBy, title, description, postTime } = doc.data();
          brainobrain.push({
            id: doc.id,
            postedBy :postedBy,
            title: title,
            description: description,
            postTime: postTime
          });
        })
      })

      setBrainobrain(brainobrain);
      setFilteredData(brainobrain);
      if(loading){
        setLoading(false);
      }

    }catch(e){
      console.log(e);
    }
  }

  
  useEffect(()=>{
    if(click > 0 ){ 
      onRefreshing();
    }
  },[click])
  

  const searchFilter =(text)=>{
    if(text){
      const newData = Brainobrain.filter((item) => {
        return (item.title.toLowerCase().includes(text.toLowerCase())||item.description.toLowerCase().includes(text.toLowerCase()));
        //return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }
    else{
      setFilteredData(Brainobrain);
      setSearch(text);
    }
  }

  useEffect(()=>{
    fetchEmail();
    fetchPosts();
  },[])
  
  useEffect(() =>{
    fetchPosts();
    setDeleted(false);
  },[deleted]);

  const handleDeletePost = (id) =>{
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text:'Cancel',
          onPress:()=> console.log('Cancel button pressed'),
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
   
    BrainobrainRef
    .doc(id)
    .get()
    .then(documentSnapshot => {
      if(documentSnapshot.exists){
        deletePostById(id);
      }
    })
  }

  const deletePostById = (id) => {
    BrainobrainRef
    .doc(id)
    .delete()
    .then(() =>{
      setDeleted(true)
      Alert.alert('Post deleted!', 'Your post has been deleted successfully', [
        {text: 'Okay'}
      ])
    })
    .catch(error => alert(error.message))
  }


    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Notice</Text>
          {
            teacher == "true"?
            <View style={styles.iconHeaderContainer}>
              <View style={styles.addIconContainer}>
                <Ionicons style={styles.add}  name="add-circle-outline" onPress={()=>navigation.navigate('AddNotice',{
                  name : name
                })} />
                <FontAwesome5 style={styles.users} name="users-cog" onPress={()=>navigation.navigate('UsersScreen')} />
                <FontAwesome style={styles.userAccount} name="user" onPress={()=>navigation.navigate('ProfileScreen')}/>
              </View>
            </View>:
            <View style={styles.iconHeaderContainer}>
              <View style={styles.addIconContainer}>
                <FontAwesome style={styles.userAccount} name="user" onPress={()=>navigation.navigate('ProfileScreen')}/>
              </View>
            </View>
          }  
        </View>
        <View style={styles.action}>
          <FontAwesome
            name="search"
            color="#009387"
            size={20}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            value={search}
            onChangeText={(text) => searchFilter(text)}
          // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}  
          />
        </View>
        {loading?
           <Feather name="loader" style={[styles.loader,styles.footer]}/>:
          
            <Animatable.View
              animation="fadeInUpBig"
              style={[styles.footer, {
                backgroundColor: "#fff"
              }]}
            >
             <ScrollView refreshControl={
              <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshing}
              colors={['#009387']}
              />
            }>
              {count > 0 ? 

                <FlatList
                  data={filteredData}
                  renderItem={({item})=>(
                    <Card
                      id={item.id}
                      postedBy={item.postedBy}
                      title={item.title}
                      description={item.description}
                      postTime={item.postTime}
                      onDelete={handleDeletePost}
                      teacher={teacher}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={true}
                />:
                <CardWarning/>
              }
            </ScrollView>    
            </Animatable.View>
          
        }
      </View>
    );
  }

export default NoticeScreen;
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
    fontSize: 18,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -2,
    paddingLeft: 10,
    color: 'black',
    fontSize: 15
  },
  dateTime: {
    textAlign:"right",
    fontSize:11
  },
  add: {
    color: 'white',
    fontSize:35,
    fontWeight:"bold",
    marginTop:-48,
    marginRight:122.5,
    backgroundColor:"#01ab9d",
    elevation:8,
    paddingVertical:5,
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
    fontSize:26,
    color:"#fff",
    marginTop:-48,
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
  errorText:{
    fontSize:16,
    color:"red",
    opacity:0.8,
    fontWeight:"700",
    textAlign:"center"
  },
  errorSubText:{
    color:"#009387",
    fontSize:15,
    textAlign:"center",
  },
  img:{
    maxWidth:"100%",
    height:"60%"
  },
  loader:{
    fontSize:60,
    color:"#009387",
    textAlign:"center",
    textAlignVertical:"center",
    paddingTop: Platform.OS==='ios'?135:0,
  },
  postByContainer:{
    marginTop:-15
  },
  postedBy:{
    color:"#009589",
    fontStyle:"italic",
  }
});
