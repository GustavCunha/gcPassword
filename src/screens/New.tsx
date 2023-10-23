import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';
import { HStack, Heading, Icon, IconButton, ScrollView, Text, VStack} from 'native-base'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { KEY_STORE } from '../utils/constant';

export function New() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function handleNew() {
        try {
            const id = uuid.v4();
    
            const newData = {
                id,
                name,
                user,
                password
            }

            const response = await SecureStore.getItemAsync(KEY_STORE)
            const previousData = response ? JSON.parse(response) : []

            const data = [...previousData, newData]

            if (name.trim() === '' || user.trim() === '' || password.trim() === '') {
                Alert.alert('Ops', 'Preencha todos os campos')
                return
            } 

            if (name.length < 3) {
                Alert.alert('Ops', 'Campo Nome precisa de no mínimo 3 letras')
                return
            }

            await SecureStore.setItemAsync(KEY_STORE, JSON.stringify(data));
            Alert.alert('Sucesso', 'Senha cadastrada com sucesso!')
            resetFields()
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível cadastrar!')
        }
    }

    function handleGoBack() {
        navigation.goBack();
    }

    function resetFields(){
        setName('')
        setUser('')
        setPassword('')
    }

    return (
        <VStack>   
            <HStack 
                w='full' 
                bg='blueGray.800' 
                p={6}
                pt={12} 
                justifyContent='space-between' 
                alignItems='center'
            >
                <IconButton 
                    icon={<Icon as={Feather} name='chevron-left' color='white' size='xl'/>}
                    onPress={handleGoBack}
                />

                <Heading 
                    color='light.100' 
                    fontSize='2xl' 
                    fontWeight='bold'
                    textAlign='center'
                    flex={1}
                    ml={-6}
                >
                    Cadastro
                </Heading>
            </HStack>

            <ScrollView w='full' px={10} mt={6}>
                <Input 
                    label='Nome do Serviço'
                    placeholder='Ex.: Google'
                    mb={5}
                    autoFocus
                    value={name} 
                    onChangeText={setName}
                />
                <Input 
                    label='E-mail ou usuário'
                    placeholder='Ex.: user.teste'
                    mb={5}
                    autoCapitalize="none" 
                    value={user}
                    onChangeText={setUser}
                />
                <Input 
                    label='Senha'
                    mb={5}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword} 
                />

                <Button
                    title='Salvar'
                    onPress={handleNew}
                    mt={5}
                />
            </ScrollView>
        </VStack>
    )
}