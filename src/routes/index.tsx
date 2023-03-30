import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { New } from "../screens/New";

const {Navigator, Screen} = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="Home" component={Home} />
                <Screen name="New" component={New} />
            </Navigator>
        </NavigationContainer>
    )
}