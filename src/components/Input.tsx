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
                bg='light.100'
                h={12}
                px={4}
                borderRadius={16}
                fontSize='md'
                color='blueGray.800'
                fontFamily='body'
                placeholderTextColor='blueGray.500'
                autoCapitalize='none'
                _focus={{
                    bgColor: 'light.50',
                    borderWidth: 0.5,
                    borderColor: 'blue.500'
                }}
                {...rest}
            />
        </>
    );
}