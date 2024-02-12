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
            bg='light.100'
            mr={3}
            w={24}
            h={24}
            rounded={16}
            justifyContent='center'
            alignItems='center'
            isPressed={isActive}
            _pressed={{
                bg: 'blue.600',
                color: 'light.100'
            }}
            {...rest}
        >
            <Center>
                <Icon 
                    as={Feather} 
                    name={iconChoice(category)} 
                    size='lg' 
                    mb={2}
                    color={isActive ? 'light.100' : 'blueGray.500'} 
                />

                <Text 
                    fontSize='sm' 
                    fontFamily={isActive ? 'heading' : 'mono'}
                    textAlign='center'
                    adjustsFontSizeToFit
                    color={isActive ? 'light.100' : 'blueGray.500'}
                >
                    {category}
                </Text>
            </Center>
        </Pressable>
    )
}