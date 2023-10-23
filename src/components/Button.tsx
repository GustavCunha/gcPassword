import {Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';
import React from 'react';

type Props = IButtonProps & {
    title: string;
  }

export function Button({ title, ...rest }: Props) {
    return (
        <NativeBaseButton
            bg='blue.600'
            h={12}
            rounded='sm'
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