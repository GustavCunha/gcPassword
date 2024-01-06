import { Heading, Image, Modal, Pressable, StatusBar, Text, VStack, useToast } from "native-base";
import { Eye, EyeSlash, Fingerprint } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert } from "react-native";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { createdLogin } from "@storage/login/createdLogin";

import logo from '../images/padlock.png';

import { useAuth } from "../hook/useAuth";

import { theme } from "../styles/theme";

export function SignIn() {
    const {signInBiometric, signInPass} = useAuth();
    const toast = useToast();
    const {colors, size} = theme;

    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [createdPass, setCreatedPass] = useState('');
    const [name, setName] = useState('');

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
                style: {backgroundColor: colors.error[400]}
            })
        try {
            await signInPass(password)
        } catch (error) {
            return Alert.alert('Erro', error.message)
        }
    }

    async function savePass() {
        try {
            if (createdPass.trim() === '' || name.trim() === '') {
                return toast.show({
                    title: 'Preencha o nome e a senha!', 
                    placement: 'top',
                    style: {backgroundColor: colors.error[400]}
                })
            }

            await createdLogin(name, createdPass)
            toast.show({
                title: 'Salvo com sucesso!', 
                placement: 'bottom',
                duration: 1000,
                style: {backgroundColor: colors.success[400]}
            })
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <VStack flex={1} p={10} bg='white'>
            <StatusBar 
                barStyle='dark-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Image source={logo} alt='Logo' size={48} alignSelf='center' mt={10}/>
            
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
                mb={5}
            >
                Proteja suas senhas, simplifique sua vida digital e 
                garanta a segurança dos seus dados com o nosso app de 
                armazenamento de senhas
            </Text>
            
            {loginWithPass && (
                <VStack my={5}> 
                    <Input
                        label="Senha"
                        placeholder="***"
                        secureTextEntry={isVisiblePassword}
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={login}
                        InputRightElement={
                            <Pressable onPress={togglePasswordVisibility} px={2} borderLeftWidth={0.5}>
                                {isVisiblePassword ? <Eye color={colors.gray_600} size='24' /> :
                                    <EyeSlash color={colors.gray_600} size='24' />   
                                }
                            </Pressable> 
                        }
                    /> 

                    <Text textAlign='center' mt={3}>Não tem senha cadastrada?
                        <Text fontFamily='heading' color='blueGray.500' onPress={() => setShowModal(true)}> Cadastre agora</Text>
                    </Text>
                </VStack>
            )}
            
            <VStack mt={5} justifyContent='center'>
                <Button 
                    title={loginWithPass ? 'Entrar' : 'Acessar com senha'} 
                    onPress={loginWithPass ? login : toggleLoginWithPass}
                />

                <Text mt={2} textAlign='center' color='blueGray.800'>Ou</Text>

                <Pressable alignItems='center' mt={2} onPress={signInBiometric}>
                    <Fingerprint color={colors.blue_600} size={40}/>
                    <Text color='blue.600' fontFamily='mono' fontSize='md'>Acessar com Biometria</Text>
                </Pressable>        
            </VStack>

            <Modal isOpen={showModal} onClose={()=> setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Cadastro de Acesso</Modal.Header>
                    <Modal.Body>
                        <Input 
                            label='Nome'
                            placeholder='Ex.: Fulano'
                            mb={2}
                            value={name}
                            onChangeText={setName}
                        />
                        <Input 
                            label='Senha'
                            placeholder="***"
                            secureTextEntry={isVisiblePassword}
                            value={createdPass}
                            onChangeText={setCreatedPass}
                            InputRightElement={
                                <Pressable onPress={togglePasswordVisibility} p={2} borderLeftWidth={0.5}>
                                    {isVisiblePassword ? <Eye color={colors.gray_600} size={size.XL} /> :
                                        <EyeSlash color={colors.gray_600} size={size.XL} />   
                                    }
                                </Pressable> 
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button title="Salvar" onPress={savePass}/>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </VStack>
    )
}