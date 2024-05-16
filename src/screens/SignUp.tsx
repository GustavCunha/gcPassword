import { useState } from 'react';
import { Center, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup';

import logo from '../images/padlock.png';

import { createdUser } from '@storage/user/createUser';
import { UserDTO } from '@storage/DTO/User';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o E-mail.').email('E-mail inválido'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.')
})

export function SignUp() {
    const navigation = useNavigation();
    const toast = useToast();

    const {control, handleSubmit, formState: {errors}} = useForm<UserDTO>({
        resolver: yupResolver(signUpSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp({name, email, password}: UserDTO) {
        try {
            setIsLoading(true);
            const data = {name: name.trim(), email: email.trim(), password: password.trim()};
            await createdUser(data);
            toast.show({
                title: 'Salvo com sucesso!', 
                placement: 'bottom',
                duration: 1000,
                bgColor: 'success.400'
            })
            handleGoBack();
        } catch (error) {
            setIsLoading(false)
            toast.show({
                title: 'Não foi possível criar a conta. Tente novamente mais tarde',
                placement: 'top',
                bgColor: 'error.400'
            })
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{flexGrow: 1, paddingBottom: 50, backgroundColor: 'white'}} 
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} pt={16} px={10} >
                <Center>
                    <Image 
                        source={logo} 
                        defaultSource={logo}
                        alt='Logo' 
                        size={44} 
                    />

                    <Text my={5} color='blue.600' fontSize='xl' fontFamily='heading'>
                        Gerencie suas contas
                    </Text>

                    <Text 
                        textAlign='center' 
                        fontSize='xs'
                        fontFamily='body'
                    >
                        Proteja suas senhas, simplifique sua vida digital e 
                        garanta a segurança dos seus dados com o nosso app de 
                        armazenamento de senhas
                    </Text>
                </Center>

                <Center mt={5} mb={5}>
                    <Text color='blueGray.600' fontSize='md' fontFamily='heading'>
                        Crie sua conta
                    </Text>
                </Center>

                <VStack mb={10}>
                    <Controller 
                        control={control}
                        name='name'
                        render={({field: {onChange, value}}) => (
                            <Input
                                label='Nome'
                                placeholder='Informe seu nome'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name='email'
                        render={({field: {onChange, value}}) => (
                            <Input
                                label='E-mail'
                                placeholder='Informe seu e-mail'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name='password'
                        render={({field: {onChange, value}}) => (
                            <Input
                                label='Crie uma senha'
                                placeholder='****'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                </VStack>

                <VStack space={5}>
                    <Button 
                        title='Salvar' 
                        onPress={handleSubmit(handleSignUp)} 
                        isLoading={isLoading}
                    />

                    <Button variant='outline' title='Voltar para o login' onPress={handleGoBack}/>
                </VStack>
            </VStack>
        </ScrollView>
    )
}