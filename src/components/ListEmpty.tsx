import {VStack, Text} from 'native-base';
import { Password } from 'phosphor-react-native';
import { theme } from '../styles/theme';

type Props = {
    message: string;
}

export function ListEmpty({message}: Props) {
    const {colors} = theme;

    return (
        <VStack flex={1} alignItems='center' justifyContent='center'>
            <Password color={colors.blueGray_700} size={34}/>
            <Text 
                color='blueGray.800' 
                fontSize='md' 
                fontFamily='body'
                textAlign='center'
                mt={2}
            >
                {message}
            </Text>
        </VStack>
    )
}