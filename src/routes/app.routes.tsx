import { StatusBar, View, useTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GearSix, PlusCircle, SquaresFour } from 'phosphor-react-native';

import { Home } from '@screens/Home';
import { New } from '@screens/New';
import { Profile } from '@screens/Profile';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
    const {colors} = useTheme();
    return (
        <View flex={1} backgroundColor='blueGray.800'>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.blue[600],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarItemStyle: { paddingBottom: 5},
                tabBarStyle: {
                    borderTopWidth: 0.5,
                    height: 60,
                }
            }}>
                <Screen 
                    name='Home' 
                    component={Home} 
                    options={{
                        tabBarIcon: ({color}) => (
                            <SquaresFour color={color} size={36}/>
                        )
                    }}
                    
                />
                <Screen 
                    name='New' 
                    component={New}
                    options={{
                        tabBarIconStyle: {paddingBottom: 25},
                        tabBarIcon: ({color, focused}) => (
                            <View rounded='full' bg={focused ? 'blue.100' : 'transparent'}>
                                <PlusCircle weight='fill' color={color} size={70}  />
                            </View>
                        )
                    }} 
                />
                <Screen 
                    name='Config' 
                    component={Profile}
                    options={{
                        tabBarIcon: ({color}) => (
                            <GearSix color={color} size={36} />
                        )
                    }} 
                />
            </Navigator>
        </View>
    )
}