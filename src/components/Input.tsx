import { IInputProps, Input as NativeBaseInput, Text } from 'native-base';

type Props = IInputProps & {
    label: String;
}

export function Input({label, ...rest}: Props) {
    return (
        <>
            <Text 
                color='blueGray.800' 
                mb={2}  
                fontSize='md'
                fontFamily='mono'
            >
                {label}
            </Text>
            
            <NativeBaseInput
                justifyContent='center'
                bg='muted.100'
                lineHeight='md'
                size='md'
                fontSize='md'
                borderRadius='xl'
                borderWidth={0.5}
                autoCapitalize='none'
                fontFamily='body'
                color='blueGray.800'
                placeholderTextColor='blueGray.500'
                _focus={{
                    borderWidth: 1,
                    borderColor: 'blue.500',
                    bg: 'white'
                }}
                {...rest}
            />
        </>
    );
}