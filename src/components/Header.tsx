import React from 'react'
import { HStack, VStack, Text, IconButton, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

export function Header() {
    const navigation = useNavigation();

    function handleAdd() {
        navigation.navigate("New");
    }

    return (
        <HStack
            w='full'
            justifyContent='space-between'
            alignItems='center'
            bg='blueGray.800'
            pt={20}
            pb={16}
            px={6}
        >
            <VStack flex={1}>
                <Text color='light.100' fontSize='lg' lineHeight='xl'>
                    Olá, 😊
                </Text>
                <Text color='light.100' fontSize='sm'>
                    Sinta-se seguro aqui 
                </Text>
            </VStack>

            <IconButton 
                icon={<Icon as={Feather} name='plus' color='white' size='xl'/>}
                onPress={handleAdd}
            />
        </HStack>
    )
}