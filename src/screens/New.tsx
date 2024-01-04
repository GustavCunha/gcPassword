import { useNavigation } from '@react-navigation/native';
import { HStack, Heading, Pressable, VStack } from 'native-base';
import { CaretLeft, Eye, EyeSlash } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { passwordAdd } from '@storage/password/passwordAdd';

import { theme } from '../styles/theme';

export function New() {
    const {navigate} = useNavigation();
    const {colors, size} = theme;

    const [service, setService] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);

    async function handleNew() {
        try {
            if (service.trim() === '' || user.trim() === '' || password.trim() === '') {
                return Alert.alert('Cadastro', 'Preencha todos os campos')
            } 

            const id = String(uuid.v4());
    
            const newPass = {id, service, user, password}

            await passwordAdd(newPass);
            Alert.alert('Sucesso', 'Senha cadastrada com sucesso!')
            resetFields()
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível cadastrar!')
        }
    }

    function handleGoBack() {
        navigate('Home');
    }

    function resetFields(){
        setService('')
        setUser('')
        setPassword('')
    }

    function togglePasswordVisibility() {
        setIsVisiblePassword(prevState => !prevState);
    }

    return (
        <VStack flex={1} bg='blueGray.800'>   
            <VStack flex={1} bg='white' w='full' p={6} mt={2}>
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
                    mb={5}
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

                {/* <Progress 
                    value={password.length} 
                    max={20} 
                    size='xs' 
                    colorScheme='blue.500'
                    _filledTrack={{
                        bg: 'blue.500'
                    }} 
                /> */}

                <Button
                    title='Salvar'
                    onPress={handleNew}
                    mt={5}
                />
            </VStack>
        </VStack>
    )
}