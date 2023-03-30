import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import { Button } from '../../components/Button';
import { Card, CardProps } from '../../components/Card';
import { Header } from '../../components/Header'

import { passwords } from '../../utils/password';

import { s } from './styles'

export function Home() {
    const [data, setData] = useState<CardProps[]>(passwords);

    return (
        <View style={s.container}>
            <Header />

            <View style={s.listHeader}>
                <Text style={s.title}>
                    Suas senhas
                </Text>

                <Text style={s.count}>
                    {`${data.length} ao total`} 
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
                        onPress={() => {}}
                    />
                }
            />

            <View style={s.footer}>
                <Button title='Limpar lista' />
            </View>
        </View>
    )
}