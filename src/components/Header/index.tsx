import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { s } from './styles'

export function Header() {
    const navigation = useNavigation();

    function handleAdd() {
        navigation.navigate("New");
    }

    return (
        <View style={s.container}>
            <View style={s.user}>
                <Text style={s.title}>
                    Olá, 😊
                </Text>
                <Text style={s.subtitle}>
                    Sinta-se seguro aqui 
                </Text>
            </View>

            <TouchableOpacity style={s.button} onPress={handleAdd}>
                <Feather name='plus' size={22} color='#FFFFFF'/>
            </TouchableOpacity>
        </View>
    )
}