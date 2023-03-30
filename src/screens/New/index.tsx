import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { s } from './styles'
import { theme } from '../../styles/theme';

export function New() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleNew() {
        try {
            const id = uuid.v4();
    
            const newData = {
                id,
                name,
                user,
                password
            }
    
            console.log(newData);
            save('@gcPassword:password', JSON.stringify(newData));
            Toast.show({
                type: 'success',
                text1: 'Informações cadastradas com sucesso!'
            })
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível cadastrar!'
            })
        }
    }

    async function save(key: string, value: string) {
        await SecureStore.setItemAsync(key, value);
    }

    return (
        <KeyboardAvoidingView 
            style={s.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >   
            <View style={s.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{zIndex: 100}}
                >
                    <Feather
                        name="chevron-left"
                        size={32}
                        color={theme.colors.white}
                    />
                </TouchableOpacity>

                <Text style={s.title}>
                    Cadastro
                </Text>
            </View>

            <View style={s.content}>
                <ScrollView>
                    <View style={s.form}>
                        <Input 
                            label='Nome do Serviço' 
                            onChangeText={setName}
                        />
                        <Input 
                            label='E-mail ou usuário'
                            autoCapitalize="none" 
                            onChangeText={setUser}
                        />
                        <Input 
                            label='Senha'
                            secureTextEntry
                            onChangeText={setPassword} 
                        />
                    </View>

                    <View style={s.footer}>
                        <Button
                            title='Salvar'
                            onPress={handleNew}
                        />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}