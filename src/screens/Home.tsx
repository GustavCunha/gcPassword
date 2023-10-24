import React, { useEffect, useState } from 'react'
import { FlatList, VStack, Text } from 'native-base';
import { Alert } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';

import { Button } from '../components/Button';
import { Card, CardProps } from '../components/Card';
import { Header } from '../components/Header'

import { KEY_STORE } from '../utils/constant';
import { Loading } from '../components/Loading';


export function Home() {
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<CardProps[]>([]);

    function handleAdd() {
        navigation.navigate("New");
    }

    async function handleFetchData() {
        try {
            const response = await SecureStore.getItemAsync(KEY_STORE);
            const data = response ? JSON.parse(response) : [];
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleRemove(id: String) {
        const response = await SecureStore.getItemAsync(KEY_STORE);
        const previousData = response ? JSON.parse(response) : []

        const data = previousData.filter((item: CardProps) => item.id !== id)
        await SecureStore.setItemAsync(KEY_STORE, JSON.stringify(data));
        setData(data);
    }

    async function handleCopyToClipboard(id: String) {
        const response = await SecureStore.getItemAsync(KEY_STORE);
        const previousData = response ? JSON.parse(response) : []

        const data = previousData.filter((item: CardProps) => item.id === id)
        await Clipboard.setStringAsync(data[0].password)

        Alert.alert('Sucesso', 'Copiado')
    }

    useEffect(() => {
        handleFetchData()
    }, [isFocused])

    return (
        <VStack flex={1} backgroundColor='light.100' alignItems='center'>
            <Header />
            
            <VStack flexDirection='row' alignItems='center' justifyContent='space-between' w='full' px={6} mt={5}>
                <Text fontSize='lg' fontWeight='bold' color='blueGray.800'>
                    Suas senhas
                </Text>

                <Text fontSize='sm' color='blueGray.800'>
                    {`${data.length ?? '0'} ao total`} 
                </Text>
            </VStack>

            {isLoading ? <Loading /> : 
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    w='full'                
                    contentContainerStyle={{padding: 24, paddingBottom: 100}}
                    renderItem={({ item }) =>
                        <Card
                            data={item}
                            onCopy={() => handleCopyToClipboard(item.id)}
                            onRemove={() => handleRemove(item.id)}
                        />
                    }
                />
            }
            <Button title='Adicionar' mb={10} px={20} onPress={handleAdd}/>
        </VStack>
    )
}