import {StyleSheet} from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.light,
        alignItems: 'center'
    },
    listHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 24
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.gray[100]
    },
    count: {
        fontSize: 13,
        color: theme.colors.gray[50]
    },
    list: {
        flex: 1,
        width: '100%'
    },
    listContent: {
        padding: 24,
        paddingBottom: 150
    },
    footer: {
        width: '100%',
        padding: 24,
        marginBottom: 20
    }
})