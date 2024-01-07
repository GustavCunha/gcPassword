import React, { useState } from 'react';
import { Heading, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { Copy, Eye, EyeClosed, Trash } from 'phosphor-react-native';
import {Feather} from '@expo/vector-icons'

import { PassDTO } from '@storage/DTO/Pass';

import { iconChoice } from '@utils/iconChoice';

import { theme } from '../styles/theme';

type Props = {
    data: PassDTO;
    onCopy: () => void;
    onRemove: () => void;
}

export function Card({ data, onCopy, onRemove }: Props) {
    const {colors, size} = theme;
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    function togglePasswordVisibility() {
        setIsVisiblePassword(prevState => !prevState);
    }

    return (
        <HStack
            bg='white'
            borderColor='blueGray.400'
            borderWidth={0.5}
            borderRadius='2xl'
            alignItems='center'
            justifyContent='center'
            w='full'
            h={20}
            mb={5}
            shadow={4}
        >
            <Pressable 
                px={2} 
                h={12}
                justifyContent='center'
                onPress={togglePasswordVisibility} 
                borderRightWidth={0.5}
                borderRightColor='blueGray.500'
            >
                {isVisiblePassword ? <EyeClosed color={colors.blueGray_500} size={size.XL} /> :
                    <Eye color={colors.gray_600} size={size.XL} />   
                }
            </Pressable>

            <VStack flex={1} px={2}>
                <HStack alignItems='center' mb={1}>
                    <Icon 
                        as={Feather} 
                        name={iconChoice(data.category)} 
                        size='md' 
                        color='blueGray.700'
                        mr={1}
                    />
                    <Heading 
                        fontSize='lg' 
                        color='blueGray.700'  
                    >
                        {data.service}
                    </Heading>
                </HStack>

                {isVisiblePassword ?
                    <Text color={colors.blueGray_500} fontSize='sm' fontFamily='mono'>
                        {data.password}
                    </Text>
                    :
                    <Text color='gray.600' fontSize='sm' fontFamily='body'>
                        {data.user}
                    </Text>
                }
            </VStack>
            
            <Pressable 
                px={2}
                h={12}
                justifyContent='center'
                onPress={onCopy}
                borderLeftWidth={.5}
                borderLeftColor='blueGray.500'
            >
                <Copy color={colors.blue_600} size={size.XL} />
            </Pressable>

            <Pressable
                px={2}
                h={12}
                justifyContent='center'
                onPress={onRemove}
                borderLeftWidth={.5}
                borderLeftColor='blueGray.500'
            >
                <Trash color={colors.red_600} size={size.XL} />
            </Pressable>
        </HStack>
    )
}