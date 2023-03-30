import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    title: {
        fontWeight: 'bold',
        color: theme.colors.gray[100],
        fontSize: 15,
    }
});