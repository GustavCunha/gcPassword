import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { New } from '@screens/New';
import { StatusBar, View } from 'native-base';

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <View flex={1} backgroundColor='blueGray.800'>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name='Home' component={Home} />
                <Screen name='New' component={New} />
            </Navigator>
        </View>
    )
}