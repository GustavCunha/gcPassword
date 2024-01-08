import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Box, FlatList, HStack, Pressable, ScrollView, Text, VStack, useToast } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { SignOut } from 'phosphor-react-native';

import { Button } from '@components/Button';
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


export function Home() {
    const navigation = useNavigation();
    const toast = useToast();
    const {signOut} = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<PassDTO[]>([]);
    const [categorySelected, setCategorySelected] = useState('')

    function handleAdd() {
        navigation.navigate("New");
    }

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

    useFocusEffect(useCallback(() => {
        fetchData();
    }, [categorySelected]));

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
                pt={10}
                h={40}
                borderBottomWidth={1}
            >
                <VStack>
                    <Text color='light.100' fontSize='2xl' fontFamily='heading'>
                        Olá! 😊
                    </Text>
                    <Text color='light.100' fontSize='sm' fontFamily='body' fontStyle='italic'>
                        Sinta-se seguro aqui 
                    </Text>
                </VStack>

                <Pressable onPress={handleSignOut} mr={-2}>
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

                <HStack alignItems='center' justifyContent='space-between' mb={3}>
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
                    />
                }
                <Button 
                    title='Adicionar' 
                    m={5}
                    onPress={handleAdd}
                />
            </VStack>
        </VStack>
    )
}