import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hook/useAuth';

import { SignIn } from '@screens/SignIn';
import { AppRoutes } from './app.routes';

export function Routes() {
    const {logged} = useAuth();

    return (
        <NavigationContainer>
            {logged ? <AppRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}