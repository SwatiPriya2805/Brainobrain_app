import React from "react";
import {
    Image, StyleSheet
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.replace("SplashScreen")}
            onDone={() => navigation.navigate("SplashScreen")}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: < Image style={styles.welcome} source={require('../Assets/Welcome.png')} />,
                    title: 'Welcome',
                    subtitle: 'Welcome to the Brainobrain App',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.images} source={require('../Assets/mathematics.png')} />,
                    title: 'Learn Something New',
                    subtitle: 'Don`t forget to read what your teachers wrote! You might learn something new.',
                }
            ]}
        />
    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    images: {
        width: 375,
        height: 300
    },
    welcome: {
        width: 400,
        height: 260,
    }
})