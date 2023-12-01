import { Input as NativeBaseInput, IInputProps, Text } from 'native-base';

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
            >
                {label}
            </Text>
            
            <NativeBaseInput 
                bg='muted.200'
                h={12}
                size="md"
                borderRadius='xl'
                borderWidth={0.5}
                autoCapitalize='none'
                fontSize="md"
                fontFamily="body"
                color="blueGray.800"
                placeholderTextColor="blueGray.500"
                _focus={{
                    borderWidth: 1,
                    borderColor: "blue.500",
                    bg: "white"
                }}
                {...rest}
            />
        </>
    );
}