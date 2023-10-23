import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { NativeBaseProvider } from 'native-base';

import { Loading } from './src/components/Loading';
import { theme } from './src/styles/theme';

export default function App() {
    const [fontsLoaded] = useFonts({Inter_400Regular, Inter_700Bold})

    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar style="light" />
            {fontsLoaded ? <Routes /> : <Loading />}
        </NativeBaseProvider>
    );
}
