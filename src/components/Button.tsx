import React from 'react';
import {Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

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
            <Heading color='white' fontSize='md'>
                {title}
            </Heading>
        </NativeBaseButton>
    );
  }