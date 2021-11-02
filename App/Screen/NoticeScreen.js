import React from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, StatusBar, Platform} from 'react-native';
import { Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const DATA = [
  {
    id: 'bd7acbea',
    username: 'Name',
    title: 'First Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut tellus venenatis, posuere quam at, sagittis velit. Fusce quis tellus a erat porttitor dapibus.'
  },
  {
    id: 'bd0scbea',
    username: 'Name',
    title: 'First Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut tellus venenatis, posuere quam at, sagittis velit.'
  },
  {
    id: 'ad7acbea',
    username: 'Name',
    title: 'First Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut tellus venenatis, posuere quam at, sagittis. Praesent ut vehicula neque.'
  },
  {
    id: '3ac68afc',
    username: 'Name',
    title: 'Second Item',
    description: 'hello hello'
  },
  {
    id: '58694a0f',
    username: 'Name',
    title: 'Third Item',
    description: 'hello hello'
  },
];


const Card = ({ title, username, description }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Paragraph style={styles.name}>{username} posted </Paragraph>
      <Text style={styles.title}>{title}</Text>
      <Paragraph>{description}</Paragraph>
      <View style={styles.removeContainer}>
        <View style={styles.removePostContainer}>
          <Ionicons  style={styles.removePost} name="remove-circle-sharp" />
        </View>
      </View>
    </View>
  </View>
);

const NoticeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Card title={item.title} description={item.description} username={item.username} />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Notice</Text>
        <View style={styles.iconHeaderContainer}>
          <View style={styles.addIconContainer}>
            <Ionicons style={styles.add}  name="add-circle-outline" onPress={()=>navigation.navigate('AddNotice')} />
            <FontAwesome5 style={styles.users} name="users-cog" onPress={()=>navigation.navigate('UsersScreen')} />
            <FontAwesome style={styles.userAccount} name="user" onPress={()=>navigation.navigate('ProfileScreen')}/>
          </View>
        </View>
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
        // onChangeText={(val) => textInputChange(val)}
        // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
        />
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: "#fff"
        }]}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Animatable.View>
    </View>
  );
}

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
  name: {
    fontWeight: "bold"
  },
  add: {
    color: 'white',
    fontSize:35,
    fontWeight:"bold",
    marginTop:-44,
    marginRight:120,
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
    opacity:0.8,
    fontSize:18,
    marginTop:-5,
    marginBottom:2
  },
  removeContainer:{
    position:"relative",
    alignItems:"flex-end"
  }
});

export default NoticeScreen;