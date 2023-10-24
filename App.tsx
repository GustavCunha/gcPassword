import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { NativeBaseProvider } from 'native-base';

import { AuthContextProvider } from './src/context/AuthContext';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

import { theme } from './src/styles/theme';

export default function App() {
    const [fontsLoaded] = useFonts({Inter_400Regular, Inter_700Bold})

    return (
        <NativeBaseProvider theme={theme}>
            <AuthContextProvider>
                <StatusBar style="auto" />
                {fontsLoaded ? <Routes /> : <Loading />}
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
