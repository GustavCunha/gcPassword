import { extendTheme } from 'native-base';

export const theme = extendTheme({
    colors: {
        light_100: '#f5f5f4',

        blue_600: '#2563eb',

        blueGray_500: '#64748b',
        blueGray_700: '#334155',

        gray_600: '#52525b',

        red_600: '#dc2626'

    },
    fonts: {
        heading: 'Poppins_600SemiBold',
        mono: 'Poppins_500Medium',
        body: 'Poppins_400Regular'
    },
    size: {
        SM: 14,
        MD: 16,
        LG: 18,
        XL: 24
    },
})