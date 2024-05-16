import { Center, Text } from "native-base";

type Props = {
    title: string;
  }

export function Header({ title }: Props) {
    return (
        <Center bg='blueGray.800' pb={6} pt={16}>
            <Text color='light.100' fontSize='xl' fontFamily='heading'>
                {title}
            </Text>
        </Center>
    )
}