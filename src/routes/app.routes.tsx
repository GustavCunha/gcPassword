import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { New } from '@screens/New';
import { StatusBar, View, useTheme } from 'native-base';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
    const {colors} = useTheme();
    return (
        <View flex={1} backgroundColor='blueGray.800'>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Navigator>
                <Screen 
                    name='Home' 
                    component={Home} 
                    options={{headerShown: false}}
                />
                <Screen 
                    name='New' 
                    component={New}
                    options={{
                        headerStyle: {backgroundColor: colors.blueGray[800]},
                        headerTitle: 'Cadastro',
                        headerTintColor: 'white',
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            fontFamily: 'Poppins_600SemiBold'
                        },
                        headerTitleAlign: 'center',
                    }} 
                />
            </Navigator>
        </View>
    )
}