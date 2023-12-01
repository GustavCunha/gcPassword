import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from '../hook/useAuth';

import { SignIn } from '@screens/SignIn';
import { AppRoutes } from './app.routes';
import { View } from 'native-base';

export function Routes() {
    const {logged} = useAuth();

    return (
        <NavigationContainer>
            {logged ? <AppRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}