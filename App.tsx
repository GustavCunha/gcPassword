import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AuthContextProvider } from './src/context/AuthContext';

import { Loading } from '@components/Loading';
import { Routes } from './src/routes';

import { theme } from './src/styles/theme';

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold
    })

    return (
        <NativeBaseProvider theme={theme}>
            <AuthContextProvider>
                {fontsLoaded ? <Routes /> : <Loading fontsLoaded={false}/>}
            </AuthContextProvider>
        </NativeBaseProvider>
    );
}
