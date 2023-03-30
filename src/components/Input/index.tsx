import { Text, TextInput, TextInputProps, View } from 'react-native';

import {s} from './styles';

type Props = TextInputProps & {
  label: string;
}

export function Input({ label, ...rest }: Props) {
    return (
        <View style={s.container}>
            <Text style={s.label}>
                {label}
            </Text>

            <TextInput style={s.input} {...rest} />
        </View>
    );
}