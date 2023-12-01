import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { New } from "../screens/New";
import { StatusBar } from "native-base";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="Home" component={Home} />
                <Screen name="New" component={New} />
            </Navigator>
        </>
    )
}