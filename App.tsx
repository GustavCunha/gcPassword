import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { NativeBaseProvider } from 'native-base';

import { AuthContextProvider } from './src/context/AuthContext';

import { Routes } from './src/routes';
import { Loading } from '@components/Loading';

import { theme } from './src/styles/theme';

export default function App() {
    const [fontsLoaded] = useFonts({Inter_400Regular, Inter_700Bold})

    return (
        <NativeBaseProvider theme={theme}>
            <AuthContextProvider>
                {fontsLoaded ? <Routes /> : <Loading fontsLoaded={false}/>}
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
