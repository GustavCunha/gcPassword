import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base';
import React from 'react';

type Props = IButtonProps & {
    title: string;
    variant?: 'solid' | 'outline'
  }

export function Button({ title, variant = 'solid',  ...rest }: Props) {
    return (
        <NativeBaseButton
            bg={variant === 'outline' ? 'light.50' : 'blue.600'}
            h={12}
            rounded={24}
            shadow='4'
            _pressed={{
                bg: variant === 'outline' ? 'light.100' : 'blue.500'
            }}
            _spinner={{
                size: 'lg'
            }}
            {...rest}
        >
            <Text 
                color={variant === 'outline' ? 'blue.600' : 'light.50'} 
                fontFamily='heading' 
                fontSize='md'
            >
                {title}
            </Text>
        </NativeBaseButton>
    );
  }