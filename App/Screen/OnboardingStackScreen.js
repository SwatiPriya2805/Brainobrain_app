import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./OnboardingScreen";

const OnboardingStack = createStackNavigator();
const OnboardingStackScreen = ({navigation})=>{
    return (
        <OnboardingStack.Navigator options={{headerShown:false}}>
            <OnboardingStack.Screen name="OnboradingScreen" component={OnboardingScreen}/>
        </OnboardingStack.Navigator>
    )
}
export default OnboardingStackScreen;
