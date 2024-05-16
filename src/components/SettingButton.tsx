import { HStack, IPressableProps, Pressable, Text } from "native-base";

type Props = IPressableProps & {
    children: React.ReactNode;
    title: string;
}

export function SettingButton({children, title, ...rest}: Props) {
    return (
        <Pressable {...rest}>
            <HStack my={5}>
                {children}
                <Text ml={2} fontFamily='mono' fontSize='lg'>
                    {title}
                </Text>
            </HStack>
        </Pressable>
    )
}