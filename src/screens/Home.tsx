import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Box, FlatList, HStack, Pressable, ScrollView, Text, VStack, useTheme, useToast } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { Moon, SignOut, Sun, SunHorizon } from 'phosphor-react-native';

import { Card } from '@components/Card';
import { CategoryCard } from '@components/CategoryCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';

import { useAuth } from '../hook/useAuth';

import { categories } from '@utils/categories';

import { PassDTO } from '@storage/DTO/Pass';
import { passwordRemoveById } from '@storage/password/passwordRemoveById';
import { passwordsGetAll } from '@storage/password/passwordsGetAll';
import { passwordsGetByCategory } from '@storage/password/passwordsGetByCategory';

type Greeting = 'Bom dia' | 'Boa tarde' | 'Boa noite';

export function Home() {
    const toast = useToast();
    const {user, signOut} = useAuth();
    const {colors} = useTheme();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<PassDTO[]>([]);
    const [categorySelected, setCategorySelected] = useState('');
    const [greetings, setGreetings] = useState<Greeting | null>(null);


    function handleSignOut() {
        signOut();
    }

    function handleCategorySelected(category: string) {
        category === categorySelected ? setCategorySelected('') : setCategorySelected(category)
    }

    async function fetchData() {
        try {
            setIsLoading(true);
            const passwords = categorySelected.length === 0 ? await passwordsGetAll() : await passwordsGetByCategory(categorySelected);
            setData(passwords);
        } catch (error) {
            console.log(error)
            Alert.alert('Senhas', 'Não foi possível carregar os dados de senhas.')
        } finally {
            setIsLoading(false)
        }
    }

    async function removePassword(id: string) {
        try {
            await passwordRemoveById(id);
            fetchData();
        } catch (error) {
            console.log(error)
            Alert.alert('Excluir Senha', 'Não foi possível excluir os dados dessa senha.')
        }
    }

    async function handleRemovePass(id: string) {
        Alert.alert(
            'Excluir Senha',
            'Deseja realmente excluir essa senha?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => removePassword(id)}
            ]
        )
    }

    async function handleCopyToClipboard(pass: PassDTO) {
        try {
            const passwords = await passwordsGetAll();
    
            const data = passwords.filter(item => item.id === pass.id);
            await Clipboard.setStringAsync(data[0].password);
            
            const {id} = pass;
            if(!toast.isActive(id)) {
                toast.show({id, description:`Senha do ${pass.service} copiada`});
            }
                
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível copiar a senha.')
        }
    }

    function getGreetings() {
        const currentDate = new Date();
        const currentTime = currentDate.getHours();

        if(currentTime >= 5 && currentTime < 12) {
            setGreetings('Bom dia')
        } else if(currentTime >= 12 && currentTime < 18) {
            setGreetings('Boa tarde')
        } else {
            setGreetings('Boa noite')
        }
    }

    const icons: Record<Greeting, JSX.Element> = {
        'Bom dia': <Sun size={20} color={colors.yellow[300]} />,
        'Boa tarde': <SunHorizon size={20} color={colors.orange[400]}/>,
        'Boa noite': <Moon size={20} color={colors.white} />,
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
            getGreetings();
        }, [categorySelected])
    );

    return (
        <VStack 
            flex={1} 
            bg='blueGray.800'
            alignItems='center'
        >
            <HStack 
                w='full' 
                justifyContent='space-between' 
                alignItems='center'
                p={6}
                h={40}
            >
                <VStack>
                    <Text color='light.100' fontSize='xl' fontFamily='heading'>
                        Olá, {user.data.name}!
                    </Text>
                    <HStack>
                        <Text color='light.100' fontSize='sm' fontFamily='body' fontStyle='italic' mr={1}>
                            {greetings}
                        </Text>

                        {greetings && icons[greetings]}
                    </HStack>
                </VStack>

                <Pressable onPress={handleSignOut} >
                    <SignOut color='white' size={36}/>
                </Pressable>
            </HStack>
            
            <VStack flex={1} bg='white' w='full' px={6} pt={3}>
                <Box mb={5}>
                    <Text fontSize='lg' fontFamily='heading' color='blueGray.800' mb={3}>
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
                                onPress={() => handleCategorySelected(item)}
                                isActive={categorySelected === item}
                            /> 
                        )}
                    </ScrollView>
                </Box>

                <HStack 
                    alignItems='center' 
                    justifyContent='space-between' 
                    pb={2}
                    borderBottomWidth={0.5}
                    borderBottomColor='blueGray.700'
                >
                    <Text fontSize='lg' fontFamily='heading' color='blueGray.800'>
                        Suas senhas
                    </Text>

                    <Text fontSize='sm' fontFamily='body' color='blueGray.800'>
                        {`${data.length ?? '0'} ao total`} 
                    </Text>
                </HStack>
                
                {isLoading ? <Loading /> : 
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}              
                        renderItem={({ item }) =>
                            <Card
                                data={item}
                                onCopy={() => handleCopyToClipboard(item)}
                                onRemove={() => handleRemovePass(item.id)}
                            />
                        }
                        contentContainerStyle={data.length === 0 && {flex: 1}}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <ListEmpty message={`Nenhuma senha armazenada\nQue tal adicionar a primeira?`}/>
                        )}
                        my={3}
                    />
                }
            </VStack>
        </VStack>
    )
}