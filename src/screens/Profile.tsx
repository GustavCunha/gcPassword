import { Header } from "@components/Header";
import { SettingButton } from "@components/SettingButton";
import { Box, Center, Divider, HStack, Text, VStack, useTheme } from "native-base";
import { Chat, HardDrive, LockKey, Question, SignOut  } from "phosphor-react-native";
import appConfig from 'app.json';
import { useAuth } from "src/hook/useAuth";
import { clearAll } from "@storage/all";

export function Profile() {
    const {colors} = useTheme();
    const {user, signOut} = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <VStack flex={1}>
            <Header title='Perfil'/>

            <Center pt={10}>
                <Text fontFamily='heading' fontSize='xl' color='blueGray.800'>
                    {user.data.name}
                </Text>

                <Text fontFamily='body' fontSize='sm' color='blueGray.400'>
                    {user.data.email}
                </Text>
            </Center>

            <Divider mt={5} thickness={2}/>

            <Box mx={10}>
                <SettingButton title="Exportar & Importar">
                    <HardDrive color={colors.blueGray[800]} size={28} />
                </SettingButton>

                <SettingButton title="Alterar a Senha">
                    <LockKey color={colors.blueGray[800]} size={28} />
                </SettingButton>

                <SettingButton title="Enviar feedback">
                    <Chat color={colors.blueGray[800]} size={28} />
                </SettingButton>

                <SettingButton title="Ajuda" onPress={clearAll}>
                    <Question color={colors.blueGray[800]} size={28} />
                </SettingButton>

                <SettingButton title="Logout" onPress={handleSignOut}>
                    <SignOut color={colors.error[500]} size={28} />
                </SettingButton>

                <Text fontFamily='body' fontSize='sm' color='blueGray.500' mt={10}>
                    v {appConfig.expo.version}
                </Text>
            </Box>
        </VStack>        
    )
}