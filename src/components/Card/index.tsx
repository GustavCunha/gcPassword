import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {Feather} from '@expo/vector-icons';
import { s } from './styles'
import { theme } from '../../styles/theme';

export type CardProps = {
    id: string;
    name: string;
    user: string;
    password: string;
}
type Props = {
    data: CardProps;
    onPress: () => void;
}

export function Card({ data, onPress }: Props) {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    function togglePasswordIsVisible() {
        setPasswordIsVisible(prevState => !prevState);
    }

    return (
        <View style={s.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={togglePasswordIsVisible}>
                <Feather 
                    name={passwordIsVisible ? 'eye' : 'eye-off'}
                    size={22}
                    color={theme.colors.gray[50]}
                />
            </TouchableOpacity>

            <View style={s.content}>
                <View>
                    <Text style={s.title}>
                        {data.name}
                    </Text>

                    {passwordIsVisible ?
                        <Text style={s.password}>
                            {data.password}
                        </Text>
                        :
                        <Text style={s.email}>
                            {data.user}
                        </Text>
                    }
                </View>
            </View>

            <TouchableOpacity style={s.share} activeOpacity={0.7}>
                <Feather 
                    name='copy'
                    size={22}
                    color={theme.colors.primary}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={s.delete}
                onPress={onPress}
            >
                <Feather
                    name="delete"
                    size={22}
                    color={theme.colors.red}
                />
            </TouchableOpacity>
        </View>
    )
}