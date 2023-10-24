import React from 'react'
import { HStack, VStack, Text, IconButton, Icon } from 'native-base';
import {Feather} from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';

export function Header() {
    const {signOut} = useAuth();

    function handleLogOut() {
        signOut()
    }

    return (
        <HStack
            w='full'
            justifyContent='space-between'
            alignItems='center'
            bg='blueGray.800'
            pt={20}
            pb={12}
            px={6}
        >
            <VStack flex={1}>
                <Text color='light.100' fontSize='2xl' lineHeight='xl'>
                    Olá, 😊
                </Text>
                <Text color='light.100' fontSize='sm'>
                    Sinta-se seguro aqui 
                </Text>
            </VStack>

            <IconButton 
                icon={<Icon as={Feather} name='log-out' color='white' size='2xl'/>}
                onPress={handleLogOut}
            />
        </HStack>
    )
}