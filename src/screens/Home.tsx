import React, { useCallback, useState } from 'react'
import { FlatList, VStack, Text, HStack, Pressable } from 'native-base';
import { Alert } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SignOut } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { ListEmpty } from '@components/ListEmpty'
import { Loading } from '@components/Loading';

import { useAuth } from '../hook/useAuth';

import { passwordsGetAll } from '@storage/password/passwordsGetAll';
import { PassDTO } from '@storage/DTO/Pass';
import { passwordRemoveById } from '@storage/password/passwordRemoveById';


export function Home() {
    const navigation = useNavigation();
    const {signOut} = useAuth();

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<PassDTO[]>([]);

    function handleAdd() {
        navigation.navigate("New");
    }

    function handleSignOut() {
        signOut();
    }

    async function fetchData() {
        try {
            const passwords = await passwordsGetAll();
            setData(passwords);
        } catch (error) {
            console.log(error)
            Alert.alert('Senhas', 'Não foi possível carregar os dados de senhas.')
        } finally {
            setIsLoading(false)
        }
    }

    async function removePassword(id: string) {
        try {
            await passwordRemoveById(id);
            fetchData();
        } catch (error) {
            console.log(error)
            Alert.alert('Excluir Senha', 'Não foi possível excluir os dados dessa senha.')
        }
    }

    async function handleRemovePass(id: string) {
        Alert.alert(
            'Excluir Senha',
            'Deseja realmente excluir essa senha?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => removePassword(id)}
            ]
        )
    }

    async function handleCopyToClipboard(id: String) {
        try {
            const pass = await passwordsGetAll();
    
            const data = pass.filter(item => item.id === id);
            await Clipboard.setStringAsync(data[0].password);
    
            Alert.alert('Sucesso', 'Copiado')
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível copiar a senha.')
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []));

    return (
        <VStack 
            flex={1} 
            bg='blueGray.800'
            alignItems='center'
        >
            <HStack 
                w='full' 
                justifyContent='space-between' 
                alignItems='center'
                py={12}
                px={6}
                borderBottomWidth={1}
            >
                <VStack>
                    <Text color='light.100' fontSize='2xl' lineHeight='xl' fontFamily='heading'>
                        Olá! 😊
                    </Text>
                    <Text color='light.100' fontSize='sm' fontFamily='body' fontStyle='italic'>
                        Sinta-se seguro aqui 
                    </Text>
                </VStack>

                <Pressable onPress={handleSignOut} p={2} mr={-2}>
                    <SignOut color='white' size={36}/>
                </Pressable>
            </HStack>
            
            <VStack flex={1} bg='white' w='full' p={6}>
                <HStack alignItems='center' justifyContent='space-between' mb={3}>
                    <Text fontSize='lg' fontFamily='heading' color='blueGray.800'>
                        Suas senhas
                    </Text>

                    <Text fontSize='sm' fontFamily='body' color='blueGray.800'>
                        {`${data.length ?? '0'} ao total`} 
                    </Text>
                </HStack>
                
                {isLoading ? <Loading /> : 
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}              
                        renderItem={({ item }) =>
                            <Card
                                data={item}
                                onCopy={() => handleCopyToClipboard(item.id)}
                                onRemove={() => handleRemovePass(item.id)}
                            />
                        }
                        contentContainerStyle={data.length === 0 && {flex: 1}}
                        ListEmptyComponent={() => (
                            <ListEmpty message={`Nenhuma senha armazenada\nQue tal adicionar a primeira?`}/>
                        )}
                    />
                }
                <Button 
                    title='Adicionar' 
                    mb={5}
                    onPress={handleAdd}
                />
            </VStack>
        </VStack>
    )
}