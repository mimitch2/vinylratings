export type ColorsKeys = keyof typeof DarkTheme.colors;

export type ThemeColors = {
    [key in ColorsKeys]: string;
};

export interface Theme {
    dark: boolean;
    colors: ThemeColors;
}

export const COLORS = {
    background: '#e8e8e6',
    primary: '#a64833',
    primaryFaded: '#a6483350',
    tertiary: '#d4a21d',
    greyPrimary: '#1e2124',
    blueGrey: '#4D5D73',
    link: '#007AFF',
    darkGrey: '#14202E',
    grey: '#adb5bd',
    lightGrey: '#d9d9d9',
    green: '#0E871E',
    danger: '#F06543'
};

export const COLORS_MAP = {
    dark: {
        background: '#14202E',
        primary: '#4E8BC7',
        primaryFaded: '#4E8BC750',
        secondary: '#833A8F',
        tertiary: '#495057',
        text: '#e8e8e6',
        danger: '#800416'
    },
    light: {
        background: '#e8e8e6',
        primary: '#4E8BC7',
        primaryFaded: '#4E8BC750',
        secondary: '#833A8F',
        tertiary: '#adb5bd',
        text: '#495057',
        danger: '#800416'
    }
};

const COMMON = {
    darkGrey: COLORS.darkGrey,
    lightGrey: COLORS.lightGrey,
    grey: COLORS.grey
};

export const DarkTheme = {
    dark: true,
    colors: {
        card: 'rgb(18, 18, 18)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
        background: COLORS.darkGrey,
        primary: '#a64833',
        primaryFaded: '#a6483350',
        secondary: '#495057',
        tertiary: '#495057',
        text: '#e8e8e6',
        textFaded: '#e8e8e650',
        danger: '#800416',
        ...COMMON
    }
};

export const DefaultTheme = {
    dark: false,
    colors: {
        card: 'rgb(18, 18, 18)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
        background: '#e8e8e6',
        primary: '#a64833',
        primaryFaded: '#a6483350',
        secondary: '#833A8F',
        tertiary: '#7f8080',
        text: '#495057',
        textFaded: '#49505750',
        danger: '#800416',
        ...COMMON
    }
};

/* CSS HEX */
// --rich-black-fogra-29: #001524ff;
// --ming: #15616dff;
// --blanched-almond: #ffecd1ff;
// --amber-sae-ece: #ff7d00ff;
// --kobe: #78290fff;
