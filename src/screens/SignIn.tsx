import { Button as Btn, Center, Image, Pressable, ScrollView, Text, VStack, useToast } from "native-base";
import { Eye, EyeSlash, Fingerprint } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import logo from '../images/padlock.png';

import { useAuth } from "../hook/useAuth";

import { theme } from "../styles/theme";

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const {signInBiometric, signInPass} = useAuth();

    const toast = useToast();
    const {colors} = theme;

    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
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

    async function login() {
        if (password.trim() === '') 
            return toast.show({
                title: '⚠ Informe a senha!', 
                placement: 'top',
                bgColor: 'error.400'
            })
        try {
            await signInPass(password)
        } catch (error) {
            return Alert.alert('Erro', error.message)
        }
    }

    function handleNewAccount() {
        navigation.navigate('signUp');
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} pt={16} px={10} bg='white'>
                <Center>
                    <Image 
                        source={logo} 
                        alt='Logo' 
                        size={44} 
                    />
            
                    <Text my={5} color='blue.600' fontSize='xl' fontFamily='heading'>
                        Gerencie suas contas
                    </Text>

                    <Text 
                        textAlign='center' 
                        fontSize='sm'
                        fontFamily='body'
                    >
                        Proteja suas senhas, simplifique sua vida digital e 
                        garanta a segurança dos seus dados com o nosso app de 
                        armazenamento de senhas
                    </Text>
                </Center>

                
                <Center mt={5} mb={loginWithPass ? 7 : 16}>
                    <Text color='blueGray.600' fontSize='md' fontFamily='heading' >
                        Acesse sua conta
                    </Text>
                </Center>
                
                {loginWithPass && (
                    <VStack mb={7}> 
                        <Input
                            label="Senha"
                            placeholder="***"
                            secureTextEntry={isVisiblePassword}
                            value={password}
                            onChangeText={setPassword}
                            onSubmitEditing={login}
                            InputRightElement={
                                <Btn variant='unstyled' onPress={togglePasswordVisibility} borderLeftWidth={0.2}>
                                    {isVisiblePassword ? <Eye color={colors.blueGray_600} size='24' /> :
                                        <EyeSlash color={colors.blueGray_600} size='24' />   
                                    }
                                </Btn> 
                            }
                        /> 

                        <Text textAlign='center' color='blueGray.500' mt={5}>Não tem senha cadastrada?
                            <Text fontFamily='heading' color='blueGray.600' onPress={handleNewAccount}> Cadastre agora</Text>
                        </Text>
                    </VStack>
                )}
                
                <VStack>
                    <Button 
                        title={loginWithPass ? 'Entrar' : 'Acessar com senha'} 
                        onPress={loginWithPass ? login : toggleLoginWithPass}
                    />

                    <Text my={3} textAlign='center' color='blueGray.600'>Ou</Text>

                    <Pressable alignItems='center' onPress={signInBiometric}>
                        <Fingerprint color={colors.primary} size={40}/>
                        <Text color='blue.600' fontFamily='mono' fontSize='md'>Acessar com Biometria</Text>
                    </Pressable>        
                </VStack>
            </VStack>
        </ScrollView>
    )
}