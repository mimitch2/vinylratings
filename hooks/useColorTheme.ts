import { useTheme, ThemeType } from '@ui-kitten/components';

import { Colors } from 'types';

export const useColorTheme = (color: Colors) => {
    const theme = useTheme();

    const COLOR_MAP: ThemeType = {
        basic: theme['color-basic-default'],
        primary: theme['color-primary-default'],
        info: theme['color-info-default'],
        warning: theme['color-warning-default'],
        danger: theme['color-danger-default'],
        text: theme['text-basic-color'],
        textFaded: theme['text-disabled-color'],
        background: theme['background-basic-color-1'],
        backgroundDark: theme['background-basic-color-2'],
        border: theme['color-basic-1100']
    };

    return COLOR_MAP[color];
};

// const themeColors = {
//     'color-primary-100': '#DBF9F5',
//     'color-primary-200': '#B9F4EF',
//     'color-primary-300': '#8EDFDF',
//     'color-primary-400': '#69B9C0',
//     'color-primary-500': '#3C8997',
//     'color-primary-600': '#2B6D81',
//     'color-primary-700': '#1E546C',
//     'color-primary-800': '#133D57',
//     'color-primary-900': '#0B2C48',
//     'color-primary-transparent-100': 'rgba(51, 102, 255, 0.08)',
//     'color-primary-transparent-200': 'rgba(51, 102, 255, 0.16)',
//     'color-primary-transparent-300': 'rgba(51, 102, 255, 0.24)',
//     'color-primary-transparent-400': 'rgba(51, 102, 255, 0.32)',
//     'color-primary-transparent-500': 'rgba(51, 102, 255, 0.40)',
//     'color-primary-transparent-600': 'rgba(51, 102, 255, 0.48)',
//     'color-success-100': '#F0FCD3',
//     'color-success-200': '#DDF9A9',
//     'color-success-300': '#C0EE7C',
//     'color-success-400': '#A2DE58',
//     'color-success-500': '#78C928',
//     'color-success-600': '#5DAC1D',
//     'color-success-700': '#459014',
//     'color-success-800': '#30740C',
//     'color-success-900': '#216007',
//     'color-success-transparent-100': 'rgba(0, 224, 150, 0.08)',
//     'color-success-transparent-200': 'rgba(0, 224, 150, 0.16)',
//     'color-success-transparent-300': 'rgba(0, 224, 150, 0.24)',
//     'color-success-transparent-400': 'rgba(0, 224, 150, 0.32)',
//     'color-success-transparent-500': 'rgba(0, 224, 150, 0.40)',
//     'color-success-transparent-600': 'rgba(0, 224, 150, 0.48)',
//     'color-info-100': '#D4FCF5',
//     'color-info-200': '#ABFAF2',
//     'color-info-300': '#7FF2F0',
//     'color-info-400': '#5DDEE6',
//     'color-info-500': '#2CBFD6',
//     'color-info-600': '#2097B8',
//     'color-info-700': '#16739A',
//     'color-info-800': '#0E537C',
//     'color-info-900': '#083C66',
//     'color-info-transparent-100': 'rgba(0, 149, 255, 0.08)',
//     'color-info-transparent-200': 'rgba(0, 149, 255, 0.16)',
//     'color-info-transparent-300': 'rgba(0, 149, 255, 0.24)',
//     'color-info-transparent-400': 'rgba(0, 149, 255, 0.32)',
//     'color-info-transparent-500': 'rgba(0, 149, 255, 0.40)',
//     'color-info-transparent-600': 'rgba(0, 149, 255, 0.48)',
//     'color-warning-100': '#FEF2D7',
//     'color-warning-200': '#FEE1B0',
//     'color-warning-300': '#FECB88',
//     'color-warning-400': '#FDB66B',
//     'color-warning-500': '#FC943A',
//     'color-warning-600': '#D8712A',
//     'color-warning-700': '#B5531D',
//     'color-warning-800': '#923912',
//     'color-warning-900': '#78260B',
//     'color-warning-transparent-100': 'rgba(255, 170, 0, 0.08)',
//     'color-warning-transparent-200': 'rgba(255, 170, 0, 0.16)',
//     'color-warning-transparent-300': 'rgba(255, 170, 0, 0.24)',
//     'color-warning-transparent-400': 'rgba(255, 170, 0, 0.32)',
//     'color-warning-transparent-500': 'rgba(255, 170, 0, 0.40)',
//     'color-warning-transparent-600': 'rgba(255, 170, 0, 0.48)',
//     'color-danger-100': '#FFE8DE',
//     'color-danger-200': '#FFCBBD',
//     'color-danger-300': '#FFA99C',
//     'color-danger-400': '#FF8883',
//     'color-danger-500': '#FF5B63',
//     'color-danger-600': '#DB4257',
//     'color-danger-700': '#B72D4D',
//     'color-danger-800': '#931D42',
//     'color-danger-900': '#7A113B',
//     'color-danger-transparent-100': 'rgba(255, 61, 113, 0.08)',
//     'color-danger-transparent-200': 'rgba(255, 61, 113, 0.16)',
//     'color-danger-transparent-300': 'rgba(255, 61, 113, 0.24)',
//     'color-danger-transparent-400': 'rgba(255, 61, 113, 0.32)',
//     'color-danger-transparent-500': 'rgba(255, 61, 113, 0.40)',
//     'color-danger-transparent-600': 'rgba(255, 61, 113, 0.48)',
//     'color-basic-100': '#FFFFFF',
//     'color-basic-200': '#F7F9FC',
//     'color-basic-300': '#EDF1F7',
//     'color-basic-400': '#E4E9F2',
//     'color-basic-500': '#C5CEE0',
//     'color-basic-600': '#8F9BB3',
//     'color-basic-700': '#2E3A59',
//     'color-basic-800': '#222B45',
//     'color-basic-900': '#1A2138',
//     'color-basic-1000': '#151A30',
//     'color-basic-1100': '#101426',
//     'color-basic-transparent-100': 'rgba(143, 155, 179, 0.08)',
//     'color-basic-transparent-200': 'rgba(143, 155, 179, 0.16)',
//     'color-basic-transparent-300': 'rgba(143, 155, 179, 0.24)',
//     'color-basic-transparent-400': 'rgba(143, 155, 179, 0.32)',
//     'color-basic-transparent-500': 'rgba(143, 155, 179, 0.40)',
//     'color-basic-transparent-600': 'rgba(143, 155, 179, 0.48)',
//     'color-basic-control-transparent-100': 'rgba(255, 255, 255, 0.08)',
//     'color-basic-control-transparent-200': 'rgba(255, 255, 255, 0.16)',
//     'color-basic-control-transparent-300': 'rgba(255, 255, 255, 0.24)',
//     'color-basic-control-transparent-400': 'rgba(255, 255, 255, 0.32)',
//     'color-basic-control-transparent-500': 'rgba(255, 255, 255, 0.40)',
//     'color-basic-control-transparent-600': 'rgba(255, 255, 255, 0.48)',
//     'color-basic-focus': '#E4E9F2',
//     'color-basic-hover': '#F7F9FC',
//     'color-basic-default': '#EDF1F7',
//     'color-basic-active': '#E4E9F2',
//     'color-basic-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-basic-focus-border': '#C5CEE0',
//     'color-basic-hover-border': '#F7F9FC',
//     'color-basic-default-border': '#EDF1F7',
//     'color-basic-active-border': '#E4E9F2',
//     'color-basic-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-basic-transparent-focus': 'rgba(143, 155, 179, 0.24)',
//     'color-basic-transparent-hover': 'rgba(143, 155, 179, 0.16)',
//     'color-basic-transparent-default': 'rgba(143, 155, 179, 0.08)',
//     'color-basic-transparent-active': 'rgba(143, 155, 179, 0.24)',
//     'color-basic-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-basic-transparent-focus-border': '#8F9BB3',
//     'color-basic-transparent-hover-border': '#8F9BB3',
//     'color-basic-transparent-default-border': '#8F9BB3',
//     'color-basic-transparent-active-border': '#8F9BB3',
//     'color-basic-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-primary-focus': '#2B6D81',
//     'color-primary-hover': '#69B9C0',
//     'color-primary-default': '#3C8997',
//     'color-primary-active': '#2B6D81',
//     'color-primary-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-primary-focus-border': '#1E546C',
//     'color-primary-hover-border': '#69B9C0',
//     'color-primary-default-border': '#3C8997',
//     'color-primary-active-border': '#2B6D81',
//     'color-primary-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-primary-transparent-focus': 'rgba(51, 102, 255, 0.24)',
//     'color-primary-transparent-hover': 'rgba(51, 102, 255, 0.16)',
//     'color-primary-transparent-default': 'rgba(51, 102, 255, 0.08)',
//     'color-primary-transparent-active': 'rgba(51, 102, 255, 0.24)',
//     'color-primary-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-primary-transparent-focus-border': '#3C8997',
//     'color-primary-transparent-hover-border': '#3C8997',
//     'color-primary-transparent-default-border': '#3C8997',
//     'color-primary-transparent-active-border': '#3C8997',
//     'color-primary-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-success-focus': '#5DAC1D',
//     'color-success-hover': '#A2DE58',
//     'color-success-default': '#78C928',
//     'color-success-active': '#5DAC1D',
//     'color-success-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-success-focus-border': '#459014',
//     'color-success-hover-border': '#A2DE58',
//     'color-success-default-border': '#78C928',
//     'color-success-active-border': '#5DAC1D',
//     'color-success-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-success-transparent-focus': 'rgba(0, 224, 150, 0.24)',
//     'color-success-transparent-hover': 'rgba(0, 224, 150, 0.16)',
//     'color-success-transparent-default': 'rgba(0, 224, 150, 0.08)',
//     'color-success-transparent-active': 'rgba(0, 224, 150, 0.24)',
//     'color-success-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-success-transparent-focus-border': '#78C928',
//     'color-success-transparent-hover-border': '#78C928',
//     'color-success-transparent-default-border': '#78C928',
//     'color-success-transparent-active-border': '#78C928',
//     'color-success-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-info-focus': '#2097B8',
//     'color-info-hover': '#5DDEE6',
//     'color-info-default': '#2CBFD6',
//     'color-info-active': '#2097B8',
//     'color-info-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-info-focus-border': '#16739A',
//     'color-info-hover-border': '#5DDEE6',
//     'color-info-default-border': '#2CBFD6',
//     'color-info-active-border': '#2097B8',
//     'color-info-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-info-transparent-focus': 'rgba(0, 149, 255, 0.24)',
//     'color-info-transparent-hover': 'rgba(0, 149, 255, 0.16)',
//     'color-info-transparent-default': 'rgba(0, 149, 255, 0.08)',
//     'color-info-transparent-active': 'rgba(0, 149, 255, 0.24)',
//     'color-info-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-info-transparent-focus-border': '#2CBFD6',
//     'color-info-transparent-hover-border': '#2CBFD6',
//     'color-info-transparent-default-border': '#2CBFD6',
//     'color-info-transparent-active-border': '#2CBFD6',
//     'color-info-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-warning-focus': '#D8712A',
//     'color-warning-hover': '#FDB66B',
//     'color-warning-default': '#FC943A',
//     'color-warning-active': '#D8712A',
//     'color-warning-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-warning-focus-border': '#B5531D',
//     'color-warning-hover-border': '#FDB66B',
//     'color-warning-default-border': '#FC943A',
//     'color-warning-active-border': '#D8712A',
//     'color-warning-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-warning-transparent-focus': 'rgba(255, 170, 0, 0.24)',
//     'color-warning-transparent-hover': 'rgba(255, 170, 0, 0.16)',
//     'color-warning-transparent-default': 'rgba(255, 170, 0, 0.08)',
//     'color-warning-transparent-active': 'rgba(255, 170, 0, 0.24)',
//     'color-warning-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-warning-transparent-focus-border': '#FC943A',
//     'color-warning-transparent-hover-border': '#FC943A',
//     'color-warning-transparent-default-border': '#FC943A',
//     'color-warning-transparent-active-border': '#FC943A',
//     'color-warning-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-danger-focus': '#DB4257',
//     'color-danger-hover': '#FF8883',
//     'color-danger-default': '#FF5B63',
//     'color-danger-active': '#DB4257',
//     'color-danger-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-danger-focus-border': '#B72D4D',
//     'color-danger-hover-border': '#FF8883',
//     'color-danger-default-border': '#FF5B63',
//     'color-danger-active-border': '#DB4257',
//     'color-danger-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-danger-transparent-focus': 'rgba(255, 61, 113, 0.24)',
//     'color-danger-transparent-hover': 'rgba(255, 61, 113, 0.16)',
//     'color-danger-transparent-default': 'rgba(255, 61, 113, 0.08)',
//     'color-danger-transparent-active': 'rgba(255, 61, 113, 0.24)',
//     'color-danger-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-danger-transparent-focus-border': '#FF5B63',
//     'color-danger-transparent-hover-border': '#FF5B63',
//     'color-danger-transparent-default-border': '#FF5B63',
//     'color-danger-transparent-active-border': '#FF5B63',
//     'color-danger-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-control-focus': '#EDF1F7',
//     'color-control-hover': '#F7F9FC',
//     'color-control-default': '#FFFFFF',
//     'color-control-active': '#EDF1F7',
//     'color-control-disabled': 'rgba(143, 155, 179, 0.24)',
//     'color-control-focus-border': '#C5CEE0',
//     'color-control-hover-border': '#F7F9FC',
//     'color-control-default-border': '#FFFFFF',
//     'color-control-active-border': '#EDF1F7',
//     'color-control-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'color-control-transparent-focus': 'rgba(255, 255, 255, 0.24)',
//     'color-control-transparent-hover': 'rgba(255, 255, 255, 0.16)',
//     'color-control-transparent-default': 'rgba(255, 255, 255, 0.08)',
//     'color-control-transparent-active': 'rgba(255, 255, 255, 0.24)',
//     'color-control-transparent-disabled': 'rgba(143, 155, 179, 0.16)',
//     'color-control-transparent-focus-border': '#FFFFFF',
//     'color-control-transparent-hover-border': '#FFFFFF',
//     'color-control-transparent-default-border': '#FFFFFF',
//     'color-control-transparent-active-border': '#FFFFFF',
//     'color-control-transparent-disabled-border': 'rgba(143, 155, 179, 0.24)',
//     'background-basic-color-1': '#FFFFFF',
//     'background-basic-color-2': '#F7F9FC',
//     'background-basic-color-3': '#EDF1F7',
//     'background-basic-color-4': '#E4E9F2',
//     'background-alternative-color-1': '#222B45',
//     'background-alternative-color-2': '#1A2138',
//     'background-alternative-color-3': '#151A30',
//     'background-alternative-color-4': '#101426',
//     'border-basic-color-1': '#FFFFFF',
//     'border-basic-color-2': '#F7F9FC',
//     'border-basic-color-3': '#EDF1F7',
//     'border-basic-color-4': '#E4E9F2',
//     'border-basic-color-5': '#C5CEE0',
//     'border-alternative-color-1': '#222B45',
//     'border-alternative-color-2': '#1A2138',
//     'border-alternative-color-3': '#151A30',
//     'border-alternative-color-4': '#101426',
//     'border-alternative-color-5': '#101426',
//     'border-primary-color-1': '#3C8997',
//     'border-primary-color-2': '#2B6D81',
//     'border-primary-color-3': '#1E546C',
//     'border-primary-color-4': '#133D57',
//     'border-primary-color-5': '#0B2C48',
//     'border-success-color-1': '#78C928',
//     'border-success-color-2': '#5DAC1D',
//     'border-success-color-3': '#459014',
//     'border-success-color-4': '#30740C',
//     'border-success-color-5': '#216007',
//     'border-info-color-1': '#2CBFD6',
//     'border-info-color-2': '#2097B8',
//     'border-info-color-3': '#16739A',
//     'border-info-color-4': '#0E537C',
//     'border-info-color-5': '#083C66',
//     'border-warning-color-1': '#FC943A',
//     'border-warning-color-2': '#D8712A',
//     'border-warning-color-3': '#B5531D',
//     'border-warning-color-4': '#923912',
//     'border-warning-color-5': '#78260B',
//     'border-danger-color-1': '#FF5B63',
//     'border-danger-color-2': '#DB4257',
//     'border-danger-color-3': '#B72D4D',
//     'border-danger-color-4': '#931D42',
//     'border-danger-color-5': '#7A113B',
//     'text-basic-color': '#E8E8E6',
//     'text-alternate-color': '#FFFFFF',
//     'text-control-color': '#FFFFFF',
//     'text-disabled-color': 'rgba(143, 155, 179, 0.48)',
//     'text-hint-color': '#8F9BB3',
//     'text-primary-color': '#3C8997',
//     'text-primary-focus-color': '#2B6D81',
//     'text-primary-hover-color': '#69B9C0',
//     'text-primary-active-color': '#2B6D81',
//     'text-primary-disabled-color': '#69B9C0',
//     'text-success-color': '#78C928',
//     'text-success-focus-color': '#5DAC1D',
//     'text-success-hover-color': '#A2DE58',
//     'text-success-active-color': '#5DAC1D',
//     'text-success-disabled-color': '#A2DE58',
//     'text-info-color': '#2CBFD6',
//     'text-info-focus-color': '#2097B8',
//     'text-info-hover-color': '#5DDEE6',
//     'text-info-active-color': '#2097B8',
//     'text-info-disabled-color': '#5DDEE6',
//     'text-warning-color': '#FC943A',
//     'text-warning-focus-color': '#D8712A',
//     'text-warning-hover-color': '#FDB66B',
//     'text-warning-active-color': '#D8712A',
//     'text-warning-disabled-color': '#FDB66B',
//     'text-danger-color': '#FF5B63',
//     'text-danger-focus-color': '#DB4257',
//     'text-danger-hover-color': '#FF8883',
//     'text-danger-active-color': '#DB4257',
//     'text-danger-disabled-color': '#FF8883',
//     'outline-color': 'rgba(143, 155, 179, 0.16)'
// };
