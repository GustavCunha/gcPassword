import { FormControl, IInputProps, Input as NativeBaseInput, Text } from 'native-base';

type Props = IInputProps & {
    label: String;
    errorMessage?: string | null;
}

export function Input({label, errorMessage = null, isInvalid, ...rest}: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={3}>
            <Text 
                color='blueGray.800' 
                mb={1}  
                fontSize='md'
                fontFamily='mono'
            >
                {label}
            </Text>
            
            <NativeBaseInput
                bg='light.50'
                h={12}
                px={4}
                borderRadius={14}
                fontSize='md'
                color='blueGray.800'
                fontFamily='body'
                placeholderTextColor='blueGray.400'
                selectionColor={'red'}
                autoCapitalize='none'
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: 'error.500'
                }}
                _focus={{
                    bgColor: 'light.50',
                    borderWidth: 0.5,
                    borderColor: 'blue.500'
                }}
                {...rest}
            />

            <FormControl.ErrorMessage _text={{color: 'error.500'}} textAlign='center'>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}