import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Box, Pressable, Progress, ScrollView, Text, VStack, useToast } from 'native-base';
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

export function New() {
    const {colors, size} = theme;
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
                categorySelected === null
            ) {
                return toast.show({
                    title: '⚠ Preencha todos os campos', 
                    placement: 'bottom',
                    style: {backgroundColor: colors.error[400]}
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
                style: {backgroundColor: colors.success[400]}
            })
            resetFields()
        } catch (error) {
            console.log(error);
            toast.show({
                title: '‼ Não foi possível cadastrar!', 
                placement: 'bottom',
                duration: 800,
                style: {backgroundColor: colors.error[400]}
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
        <VStack flex={1} bg='blueGray.800'>   
            <ScrollView flex={1} bg='white' w='full' p={6} mt={2}>
                <Text 
                    color='blueGray.800' 
                    mb={2}  
                    fontSize='md'
                    fontFamily='mono'
                >
                    Categoria
                </Text>

                <Box mb={5}>
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
                    mb={5}
                    value={service} 
                    onChangeText={setService}
                />
                <Input 
                    label='E-mail ou usuário'
                    placeholder='Ex.: user.teste'
                    mb={5}
                    value={user}
                    onChangeText={setUser}
                />
                <Input 
                    label='Senha'
                    placeholder='Digite uma senha'
                    mb={2}
                    secureTextEntry={isVisiblePassword}
                    value={password}
                    onChangeText={setPassword} 
                    InputRightElement={
                        <Pressable onPress={togglePasswordVisibility} p={2} borderLeftWidth={0.5}>
                            {isVisiblePassword ? <Eye color={colors.gray_600} size={size.XL} /> :
                                <EyeSlash color={colors.gray_600} size={size.XL} />   
                            }
                        </Pressable> 
                    }
                />
                
                <Progress 
                    value={password.length === 0 ? 0 : calculatePasswordPercentage(passStrength)} 
                    max={4} 
                    size='xs' 
                    colorScheme={getColorScheme(passStrength)}
                />
                <Text fontSize='xs'>{passStrength}</Text>

                <Button
                    title='Salvar'
                    onPress={handleNew}
                    my={5}
                    isLoading={isLoading}
                />
            </ScrollView>
        </VStack>
    )
}