import { VStack, Icon, Text, Button, IButtonProps } from "native-base";
import {Feather} from '@expo/vector-icons'
import { iconChoice } from "@utils/iconChoice";

type Props = IButtonProps & {
    category: string;
    isActive?: boolean
}

export function CategoryCard({category, isActive = false, ...rest}: Props) {
    return (
        <Button
            variant='unstyled'
            py={2}
            mr={2}
            bgColor={isActive ? 'blue.600' : 'muted.100'}
            rounded='lg'
            w='24'
            {...rest}
        >
            <VStack alignItems='center' justifyContent='center'>
                <Icon 
                    as={Feather} 
                    name={iconChoice(category)} 
                    size='lg' 
                    color={isActive ? 'white' : 'blueGray.500'} 
                    mb={2}
                />

                <Text 
                    fontSize='sm' 
                    fontFamily={isActive ? 'heading' : 'mono'}
                    color={isActive ? 'white' : 'blueGray.500'}
                    textAlign='center'
                    adjustsFontSizeToFit
                >
                    {category}
                </Text>
            </VStack>
        </Button>
    )
}