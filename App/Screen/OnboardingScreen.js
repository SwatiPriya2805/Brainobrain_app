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
                    image: <Image style={styles.images} source={require('../Assets/Push_notification.png')} />,
                    title: 'Be Notified ',
                    subtitle: 'Be the first to be notified. Stay updated with the latest information from your teacher.',
                },
                // {
                //     backgroundColor: '#fff',
                //     image: <Image style={styles.images} source={require('../Assets/Enjoy.png')} />,
                //     title: 'Enjoy',
                //     subtitle: 'Last but not least, Have Fun!',
                // },
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