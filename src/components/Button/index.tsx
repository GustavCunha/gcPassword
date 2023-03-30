import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { s } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
  }

export function Button({ title, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={s.container}
            {...rest}
        >
            <Text style={s.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
  }