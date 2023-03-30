import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.gray[25],
        borderWidth: 1,
        paddingLeft: 20,
        marginBottom: 8,
        borderRadius: 4
    },
    content: {
        flex: 1,
        padding: 22,
    },
    title: {
        fontSize: 15,
        lineHeight: 18,
        color: theme.colors.gray[100],
        fontWeight: 'bold',
    },
    email: {
        color: theme.colors.gray[50],
        fontSize: 13,
    },
    password: {
        color: theme.colors.primary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    share: {
        paddingHorizontal: 10,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete: {
        height: 80,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.gray[25],
    }
});