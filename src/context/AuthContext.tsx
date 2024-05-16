import { UserDTO } from '@storage/DTO/User';
import { login } from '@storage/user/login';
import * as LocalAuthentication from 'expo-local-authentication';
import { ReactNode, createContext, useState } from 'react';
import { Alert } from 'react-native';

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: User;
    isUserLoading: boolean;
    signInBiometric: () => Promise<void>;
    signInPass: (pass: string) => Promise<void>;
    signOut: () => Promise<void>;
}

type User = {
    logged: boolean;
    data: UserDTO;
    byBiometric?: boolean;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [isUserLoading, setIsUserLoading] = useState(false);

    async function handleAuthentication() {
        const data = await login();

        if(data) {
            const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    
            if (!isBiometricEnrolled) {
                return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, cadastre no dispositivo ')
            }
    
            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Acesse com Biometria',
                fallbackLabel: 'Biometria não reconhecida'
            })
    
            setUser({
                logged: true,
                data,
                byBiometric: auth.success
            })
        } else {
            throw new Error('É preciso se cadastrar primeiro!')
        }
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

    async function signInPass(pass: string) {
        try {
            setIsUserLoading(true)
            const data = await login();
            if(data && data.password === pass) {
                setUser({
                    logged: true, data
                })
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
        setUser({} as User)
    }

    return (
        <AuthContext.Provider value={{
            signInBiometric,
            signInPass,
            signOut,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}