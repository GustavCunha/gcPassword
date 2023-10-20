import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

import { Button } from '../../components/Button';
import { Card, CardProps } from '../../components/Card';
import { Header } from '../../components/Header'

import { KEY_STORE } from '../../utils/constant';

import { s } from './styles'

export function Home() {
    const isFocused = useIsFocused();
    const [data, setData] = useState<CardProps[]>([]);

    async function handleFetchData() {
        try {
            const response = await SecureStore.getItemAsync(KEY_STORE);
            const data = response ? JSON.parse(response) : [];
            setData(data)
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
        <View style={s.container}>
            <Header />

            <View style={s.listHeader}>
                <Text style={s.title}>
                    Suas senhas
                </Text>

                <Text style={s.count}>
                    {`${data.length ?? '0'} ao total`} 
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                style={s.list}
                contentContainerStyle={s.listContent}
                renderItem={({ item }) =>
                    <Card
                        data={item}
                        onCopy={() => handleCopyToClipboard(item.id)}
                        onRemove={() => handleRemove(item.id)}
                    />
                }
            />

            <View style={s.footer}>
                <Button title='Limpar lista' />
            </View>
        </View>
    )
}