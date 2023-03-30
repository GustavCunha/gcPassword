import { StyleSheet} from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16
    },
    label: {
        fontSize: 15,
        color: theme.colors.gray[50],
        marginBottom: 7
    },
    input: {
        height: 56,
        width: '100%',
        borderColor: theme.colors.gray[25],
        borderWidth: 1,
        paddingLeft: 22,
        borderRadius: 4,
        backgroundColor: theme.colors.white,

    }
});