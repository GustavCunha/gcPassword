import { Center, Spinner, Text } from 'native-base';

type Props = {
    fontsLoaded?: boolean;
}

export function Loading({fontsLoaded = true}: Props) {
    return (
        <Center flex={1}>
            <Spinner color='blue.600' size='lg'/>
            {fontsLoaded && <Text pt={5} color='blue.600' fontFamily='mono'>Aguarde um pouco</Text>}
        </Center>
    )
}