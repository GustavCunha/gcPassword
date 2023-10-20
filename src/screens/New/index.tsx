import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { KEY_STORE } from '../../utils/constant';

import { s } from './styles'
import { theme } from '../../styles/theme';

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

    function resetFields(){
        setName('')
        setUser('')
        setPassword('')
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
                            autoFocus
                            value={name} 
                            onChangeText={setName}
                        />
                        <Input 
                            label='E-mail ou usuário'
                            autoCapitalize="none" 
                            value={user}
                            onChangeText={setUser}
                        />
                        <Input 
                            label='Senha'
                            secureTextEntry
                            value={password}
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