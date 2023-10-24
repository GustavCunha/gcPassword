import React, { useState } from 'react'
import {Feather} from '@expo/vector-icons';
import { Heading, HStack, Icon, Pressable, Text, VStack } from 'native-base';

export type CardProps = {
    id: string;
    name: string;
    user: string;
    password: string;
}
type Props = {
    data: CardProps;
    onCopy: () => void;
    onRemove: () => void;
}

export function Card({ data, onCopy, onRemove }: Props) {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    function togglePasswordIsVisible() {
        setPasswordIsVisible(prevState => !prevState);
    }

    return (
        <HStack
            bg='white'
            borderColor='blueGray.500'
            borderWidth={1}
            borderRadius='sm'
            alignItems='center'
            justifyContent='center'
            w='full'
            h={20}
            mb={5}
        >
            <Pressable 
                onPress={togglePasswordIsVisible} 
                px={2} 
                h={12}
                justifyContent='center'
                borderRightWidth={1}
                borderRightColor='blueGray.500'
            >
                <Icon as={Feather} name={passwordIsVisible ? 'eye-off' : 'eye'} color='gray.600' size='lg'/>
            </Pressable>

            <VStack flex={1} ml={2} alignItems='center'>
                <Heading fontSize='15' lineHeight='18' color='blueGray.500' fontWeight='bold'>
                    {data.name}
                </Heading>

                {passwordIsVisible ?
                    <Text color='blueGray.700' fontSize='sm' fontWeight='bold'>
                        {data.password}
                    </Text>
                    :
                    <Text color='gray.600' fontSize='sm'>
                        {data.user}
                    </Text>
                }
            </VStack>
            
            <Pressable 
                px={2}
                onPress={onCopy}
                justifyContent='center'
                h={12}
                borderLeftWidth={1}
                borderLeftColor='blueGray.500'
            >
                <Icon as={Feather} name='copy' color='blue.600' size='lg'/>
            </Pressable>

            <Pressable
                px={2}
                justifyContent='center'
                h={12}
                borderLeftWidth={1}
                borderLeftColor='blueGray.500'
                onPress={onRemove}
            >
                <Icon as={Feather} name='trash-2' color='red.600' size='lg'/>
            </Pressable>
        </HStack>
    )
}