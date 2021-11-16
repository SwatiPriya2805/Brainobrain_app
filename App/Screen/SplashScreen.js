import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const SplashScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../Assets/AppLogo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: "#fff"
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: "#05375a"
            }]}>Stay connected and Learn!</Text>
            <Text style={styles.text}>Sign in with your account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <FontAwesome 
                        name="arrow-circle-right"
                        color="#fff"
                        size={20} 
                        style={styles.icons}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 80,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius:250
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  icons:{
    paddingRight:2,
    paddingLeft:8
  },
  signIn: {
    width: 170,
    height: Platform.OS=== 'ios'?50: 40,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: Platform.OS=== 'ios'?25:50,
    flexDirection:'row'
  },
  textSign: {
    textAlign:"center",
    color: 'white',
    fontWeight: 'bold',
    fontSize:18.5,
  }
});