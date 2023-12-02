import { Heading, Image, Pressable, StatusBar, Text, VStack } from "native-base";
import { Eye, EyeSlash, Fingerprint } from "phosphor-react-native";
import React, { useState } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import logo from '../images/padlock.png';

import { useAuth } from "../hook/useAuth";

import { theme } from "../styles/theme";

export function SignIn() {
    const {signIn} = useAuth();
    const {colors, size} = theme;

    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loginWithPass, setLoginWithPass] = useState(false);

    function togglePasswordVisibility() {
        setIsVisiblePassword(prevState => !prevState);
    }

    function toggleLoginWithPass() {
        if(!loginWithPass) {
            setLoginWithPass(prevState => !prevState);
        }
    }

    // useEffect(() => {
    //     signIn()
    // },[])
    
    return (
        <VStack flex={1} p={10} bg='white'>
            <StatusBar 
                barStyle='dark-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Image source={logo} alt='Logo' size={48} alignSelf='center' />
            
            <Heading 
                color='blue.600' 
                fontSize='xl'
                textAlign='center'
                my={3}
            >
                Gerencie suas contas
            </Heading>
            <Text 
                textAlign='center' 
                fontSize='sm'
                fontFamily='body'
            >
                Proteja suas senhas, simplifique sua vida digital e 
                garanta a segurança dos seus dados com o nosso app de 
                armazenamento de senhas
            </Text>
            
            {loginWithPass && (
                <VStack my={6}>
                    <Input 
                        mb={5}
                        label="E-mail"
                        value={user}
                        onChangeText={setUser}
                    />
                    
                    <Input
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
                </VStack>
            )}
            <VStack flex={1} justifyContent='center'>
                <Button title={loginWithPass ? 'Entrar' : 'Acessar com usuário e senha'} mt={5} onPress={toggleLoginWithPass}/>

                <Text mt={2} textAlign='center' color='blueGray.800'>Ou</Text>

                <Pressable alignItems='center' mt={2} onPress={signIn}>
                    <Fingerprint color={colors.blue_600} size={40}/>
                    <Text color='blue.600' fontFamily='mono' fontSize='md'>Acessar com Biometria</Text>
                </Pressable>
            </VStack>
        </VStack>
    )
}