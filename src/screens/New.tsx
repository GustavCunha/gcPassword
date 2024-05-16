import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Box, Button as Btn, Progress, ScrollView, Text, VStack, useToast } from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import uuid from 'react-native-uuid';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { CategoryCard } from '@components/CategoryCard';

import { passwordAdd } from '@storage/password/passwordAdd';

import { categories } from '@utils/categories';
import { assessPassStrength } from '@utils/assessPasswordStrength';
import { getColorScheme } from '@utils/getColorScheme';
import { calculatePasswordPercentage } from '@utils/calculatePasswordPercentage';

import { theme } from '../styles/theme';
import { Header } from '@components/Header';

export function New() {
    const {colors} = theme;
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [passStrength, setPassStrength] = useState('');

    const [service, setService] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [categorySelected, setCategorySelected] = useState('')

    async function handleNew() {
        try {
            Keyboard.dismiss();
            if (service.trim() === '' || 
                user.trim() === '' || 
                password.trim() === '' ||
                categorySelected === ''
            ) {
                return toast.show({
                    title: '⚠ Preencha todos os campos', 
                    placement: 'bottom',
                    duration: 1000,
                    bgColor: 'error.400'
                })
            } 
            setIsLoading(true)

            const id = String(uuid.v4());

            const newPass = {id, service, user, password, category: categorySelected}

            await passwordAdd(newPass);
            toast.show({
                title: 'Salvo com sucesso!', 
                placement: 'bottom',
                duration: 1000,
                bgColor: 'success.400'
            })
            resetFields()
        } catch (error) {
            console.log(error);
            toast.show({
                title: '‼ Não foi possível cadastrar!', 
                placement: 'bottom',
                duration: 800,
                bgColor: 'error.400'
            })
        } finally {
            setIsLoading(false)
        }
    }

    function resetFields(){
        setService('')
        setUser('')
        setPassword('')
        setCategorySelected('')
    }

    function togglePasswordVisibility() {
        setIsVisiblePassword(prevState => !prevState);
    }

    useEffect(() => {
        setPassStrength(assessPassStrength(password));
    }, [password])

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <Header title='Cadastro'/>
            
            <VStack flex={1} bg='white' px={6} pt={5}>
                <Box mb={5}>
                    <Text 
                        color='blueGray.800' 
                        fontSize='md'
                        fontFamily='mono'
                        mb={2}  
                    >
                        Categoria
                    </Text>

                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                    >
                        {categories.map(item => 
                            <CategoryCard 
                                key={item} 
                                category={item}
                                onPress={() => setCategorySelected(item)}
                                isActive={categorySelected === item}
                            /> 
                        )}
                    </ScrollView>
                </Box>
                
                <Input 
                    label='Nome do Serviço'
                    placeholder='Ex.: Google'
                    mb={3}
                    value={service} 
                    onChangeText={setService}
                />
                <Input 
                    label='E-mail ou usuário'
                    placeholder='Ex.: user.teste'
                    mb={3}
                    value={user}
                    onChangeText={setUser}
                />
                <Input 
                    label='Senha'
                    placeholder='Digite uma senha'
                    mb={3}
                    secureTextEntry={isVisiblePassword}
                    value={password}
                    onChangeText={setPassword} 
                    InputRightElement={
                        <Btn variant='unstyled' onPress={togglePasswordVisibility} borderLeftWidth={0.2}>
                            {isVisiblePassword ? <Eye color={colors.blueGray_600} size={24} /> :
                                <EyeSlash color={colors.blueGray_600} size={24} />   
                            }
                        </Btn> 
                    }
                />
                
                <Progress 
                    value={password.length === 0 ? 0 : calculatePasswordPercentage(passStrength)} 
                    max={4} 
                    size='xs' 
                    colorScheme={getColorScheme(passStrength)}
                />
                <Text mt={1} fontSize='xs'>{passStrength}</Text>

                <Button
                    title='Salvar'
                    onPress={handleNew}
                    mt={12}
                    isLoading={isLoading}
                />
            </VStack>
        </ScrollView>
    )
}