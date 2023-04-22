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
        text: theme['text-basic-color']
    };

    return COLOR_MAP[color];
};
