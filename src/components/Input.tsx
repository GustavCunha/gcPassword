import { IInputProps, Input as NativeBaseInput, Text } from 'native-base';

type Props = IInputProps & {
    label: String;
}

export function Input({label, ...rest}: Props) {
    return (
        <>
            <Text 
                color='blueGray.800' 
                mb={1}  
                fontSize='md'
                fontFamily='mono'
            >
                {label}
            </Text>
            
            <NativeBaseInput
                bg='muted.100'
                h={12}
                px={4}
                borderWidth={0.5}
                borderRadius='xl'
                fontSize='md'
                color='blueGray.800'
                fontFamily='body'
                placeholderTextColor='blueGray.500'
                _focus={{
                    bgColor: 'muted.50',
                    borderWidth: 1,
                    borderColor: 'blue.500'
                }}
                {...rest}
            />
        </>
    );
}