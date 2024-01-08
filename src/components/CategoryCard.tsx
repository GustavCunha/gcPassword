import { Icon, Text, Center, Pressable, IPressableProps } from "native-base";
import {Feather} from '@expo/vector-icons'
import { iconChoice } from "@utils/iconChoice";

type Props = IPressableProps & {
    category: string;
    isActive: boolean
}

export function CategoryCard({category, isActive, ...rest}: Props) {
    return (
        <Pressable 
            bg='muted.100'
            py={2}
            mr={3}
            w={24}
            rounded='lg'
            justifyContent='center'
            alignItems='center'
            isPressed={isActive}
            _pressed={{
                bg: 'blue.600',
                color: 'white'
            }}
            {...rest}
        >
            <Center>
                <Icon 
                    as={Feather} 
                    name={iconChoice(category)} 
                    size='lg' 
                    mb={2}
                    color={isActive ? 'white' : 'blueGray.500'} 
                />

                <Text 
                    fontSize='sm' 
                    fontFamily={isActive ? 'heading' : 'mono'}
                    textAlign='center'
                    adjustsFontSizeToFit
                    color={isActive ? 'white' : 'blueGray.500'}
                >
                    {category}
                </Text>
            </Center>
        </Pressable>
    )
}