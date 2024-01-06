import { VStack, Icon, Text, Button, IButtonProps } from "native-base";
import {Feather} from '@expo/vector-icons'
import { CategoryDTO } from "@storage/DTO/Category";

type Props = IButtonProps & {
    category: CategoryDTO;
    isActive?: boolean
}

export function CategoryCard({category, isActive = true, ...rest}: Props) {
    return (
        <Button
            variant='unstyled'
            p={2}
            mr={2}
            bgColor={isActive ? 'blue.600' : 'muted.100'}
            rounded='lg'
            w='24'
            {...rest}
        >
            <VStack alignItems='center' justifyContent='center'>
                <Icon 
                    as={Feather} 
                    name={category.icon} 
                    size='lg' 
                    color={isActive ? 'white' : 'blueGray.500'} 
                    mb={2}
                />

                <Text 
                    fontSize='sm' 
                    fontFamily='mono'
                    color={isActive ? 'white' : 'blueGray.500'}
                    textAlign='center'
                    adjustsFontSizeToFit
                >
                    {category.title}
                </Text>
            </VStack>
        </Button>
    )
}