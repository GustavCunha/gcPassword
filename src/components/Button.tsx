import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base';
import React from 'react';

type Props = IButtonProps & {
    title: string;
  }

export function Button({ title, ...rest }: Props) {
    return (
        <NativeBaseButton
            bg='blue.600'
            h={12}
            rounded='2xl'
            shadow='4'
            _pressed={{
                bg: 'blue.500'
            }}
            {...rest}
        >
            <Text color='white' fontFamily='heading' fontSize='md'>
                {title}
            </Text>
        </NativeBaseButton>
    );
  }