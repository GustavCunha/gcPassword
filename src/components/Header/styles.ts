import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const s = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 24
    },
    button: {
        height: 56,
        width: 56,
        borderRadius: 4,
        borderColor: theme.colors.gray[25],
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    user: {
        flex: 1,
        // marginLeft: 12
    },
    title: {
        color: theme.colors.white,
        fontSize: 20
    },
    subtitle: {
        color: theme.colors.white,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: 'bold'
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 5,
      }
})