import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hook/useAuth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const {logged} = useAuth();

    return (
        <NavigationContainer>
            {logged ? <AppRoutes/> : <AuthRoutes />}
        </NavigationContainer>
    )
}