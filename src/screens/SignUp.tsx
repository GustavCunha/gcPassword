import React, { useState } from 'react';
import { Center, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import logo from '../images/padlock.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { createdLogin } from '@storage/login/createdLogin';

export function SignUp() {
    const navigation = useNavigation();
    const toast = useToast();

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp() {
        try {
            setIsLoading(true);
            if (name.trim() === '' || pass.trim() === '') {
                return toast.show({
                    title: 'Preencha todos os campos',
                    placement: 'top',
                    bgColor: 'error.400'
                })
            }
            await createdLogin(name, pass);
            toast.show({
                title: 'Salvo com sucesso!', 
                placement: 'bottom',
                duration: 1000,
                bgColor: 'success.400'
            })
            handleGoBack();
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.show({
                title: 'Não foi possível criar a conta. Tente novamente mais tarde',
                placement: 'top',
                bgColor: 'error.400'
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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

                <Center mt={5} mb={7}>
                    <Text color='blueGray.600' fontSize='lg' fontFamily='heading'>
                        Crie sua conta
                    </Text>
                </Center>

                <VStack mb={10}>
                    <Input
                        label='Qual é seu nome?'
                        placeholder='Ex.: Fulano'
                        mb={3}
                        onChangeText={setName}
                    />

                    <Input 
                        label='Crie uma senha'
                        placeholder="***"
                        mb={3}
                        onChangeText={setPass}
                    />
                </VStack>

                <VStack space={5}>
                    <Button title="Salvar" onPress={handleSignUp} isLoading={isLoading}/>

                    <Button variant='outline' title="Voltar para o login" onPress={handleGoBack}/>
                </VStack>
            </VStack>
        </ScrollView>
    )
}