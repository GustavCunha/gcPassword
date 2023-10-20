import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background.light,
        alignItems: 'center',
    },
    header: {
        height: 110,
        width: '100%',
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 24,
        paddingTop: 50,
        marginBottom: 24,
        borderBottomColor: theme.colors.gray[50],
        borderBottomWidth: 1
    },
    title: {
        fontSize: 22,
        color: theme.colors.white,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginLeft: -32
    },
    form: {
        flex: 1,
        padding: 24,
    },
    content: {
        width: '100%',
    },
    footer: {
        width: '100%',
        padding: 24,
        marginBottom: 24
    }
});