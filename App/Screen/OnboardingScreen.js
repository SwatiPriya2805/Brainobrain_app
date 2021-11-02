import React from "react";
import {
    Image , StyleSheet
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation})=>{
    return(
        <Onboarding
        onSkip={()=> navigation.replace("SplashScreen")}
        onDone={()=>navigation.navigate("SplashScreen")}
            pages={[
                {
                backgroundColor: '#90E4DD',
                image: <Image style={styles.images} source={require('../Assets/Push_notification.png')} />,
                title: 'Manage Notifications',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                backgroundColor: '#fff',
                image: <Image style={styles.images} source={require('../Assets/boarding1.png')} />,
                title: 'Onboard',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                
            ]}
        />

    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    images:{
        width:350,
        height:200
    }
})