import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import { SignIn } from '../screens/SignIn';
import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';

export function Routes() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false)

    if (loading) return <Loading />

    return (
        <NavigationContainer>
            {user ? <AppRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}