import { extendTheme } from 'native-base';

export const theme = extendTheme({
    colors: {
        light_100: '#f5f5f4',

        primary: '#2563EB',

        blueGray_500: '#64748B',
        blueGray_600: '#475569',
        blueGray_700: '#334155',

    },
    fonts: {
        heading: 'Poppins_600SemiBold',
        mono: 'Poppins_500Medium',
        body: 'Poppins_400Regular'
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
    },
    sizes: {
        14: 56,
        44: 175
    }
})