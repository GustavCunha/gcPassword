import React, { useEffect, useState } from "react";
import { Heading, Icon, Image, Pressable, Text, VStack } from "native-base";
import {Feather} from '@expo/vector-icons';

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import logo from '../images/padlock.png'
import { useAuth } from "../hook/useAuth";

export function SignIn() {
    const {signIn} = useAuth();

    const [passwordIsVisible, setPasswordIsVisible] = useState(true);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function togglePasswordIsVisible() {
        setPasswordIsVisible(prevState => !prevState);
    }

    useEffect(() => {
        signIn()
    },[])
    
    return (
        <VStack flex={1} p={10} bg='light.100'>
            {/* Logo */}
            <Image source={logo} alt='Logo' size={48} alignSelf='center' />
            {/* Description */}
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
                    {'Proteja suas senhas, simplifique sua vida digital e garanta a segurança dos seus dados com o nosso app de armazenamento de senhas'}
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
                secureTextEntry={passwordIsVisible}
                InputRightElement={
                    <Pressable onPress={togglePasswordIsVisible}>
                        <Icon as={Feather} name={passwordIsVisible ? 'eye' : 'eye-off'} color='gray.600' size='lg' mr={2} />
                    </Pressable> 
                }
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            /> 
            
            {/* Button */}
            <Button title="Entrar" mt={5} onPress={signIn}/>
        </VStack>
    )
}