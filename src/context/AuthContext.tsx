import { getLogin } from '@storage/login/getLogin';
import * as LocalAuthentication from 'expo-local-authentication';
import { ReactNode, createContext, useState } from 'react';
import { Alert } from 'react-native';

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    logged: boolean;
    isUserLoading: boolean;
    signInBiometric: () => Promise<void>;
    signInPass: (pass: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps) {
    const [logged, setLogged] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(false);

    async function handleAuthentication() {
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isBiometricEnrolled) {
            return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo ')
        }

        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login com Biometria',
            fallbackLabel: 'Biometria não reconhecida'
        })

        setLogged(auth.success)
    }

    async function signInBiometric() {
        try {
            setIsUserLoading(true)
            await handleAuthentication()
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInPass(password: string) {
        try {
            setIsUserLoading(true)
            const pass = await getLogin();
            if(pass !== null && pass.pass === password) {
                setLogged(true) 
            } else {
                throw new Error('Autenticação inválida')
            }
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    async function signOut() {
        setLogged(false)
    }

    return (
        <AuthContext.Provider value={{
            signInBiometric,
            signInPass,
            signOut,
            isUserLoading,
            logged
        }}>
            {children}
        </AuthContext.Provider>
    )
}