import React, { useEffect, useState } from "react";
import { Heading, Image, Pressable, StatusBar, Text, VStack } from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import logo from '../images/padlock.png'

import { useAuth } from "../hook/useAuth";

import { theme } from "../styles/theme";

export function SignIn() {
    const {signIn} = useAuth();
    const {colors, size} = theme;

    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function togglePasswordVisibility() {
        setIsVisiblePassword(prevState => !prevState);
    }

    useEffect(() => {
        signIn()
    },[])
    
    return (
        <VStack flex={1} p={10} bg='white'>
            <StatusBar 
                barStyle='dark-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Image source={logo} alt='Logo' size={48} alignSelf='center' />
            
            <VStack alignItems='center' my={6}>
                <Heading 
                    color='blue.600' 
                    fontSize='xl' 
                    mb={3}
                >
                    Gerencie suas contas
                </Heading>
                <Text 
                    textAlign='center' 
                    fontSize='sm'
                    mb={5}
                >
                    Proteja suas senhas, simplifique sua vida digital e 
                    garanta a segurança dos seus dados com o nosso app de 
                    armazenamento de senhas
                </Text>
            </VStack>

            <Input 
                mb={5}
                label="E-mail"
                value={user}
                onChangeText={setUser}
            />
            
            <Input 
                mb={5}
                label="Senha"
                secureTextEntry={isVisiblePassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                InputRightElement={
                    <Pressable onPress={togglePasswordVisibility} p={2} borderLeftWidth={0.5}>
                        {isVisiblePassword ? <Eye color={colors.gray_600} size={size.XL} /> :
                            <EyeSlash color={colors.gray_600} size={size.XL} />   
                        }
                    </Pressable> 
                }
            /> 
            
            <Button title="Entrar" mt={5} onPress={signIn}/>
        </VStack>
    )
}