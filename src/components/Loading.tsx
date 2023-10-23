import { Center, Heading, Spinner, Text } from 'native-base';

export function Loading() {
    return (
        <Center flex={1} bg='light.100'>
            <Spinner color='blue.600' size='lg'/>
            <Heading paddingTop={5} color='blue.600' fontSize='lg'>Aguarde um pouco</Heading>
        </Center>
    )
}