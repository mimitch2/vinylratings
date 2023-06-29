// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserData, DiscogsImage } from './releases';

export type VoidFunc = <T>(params: T | undefined) => void;
export type VoidFuncNoParams = () => void;

export enum Colors {
    basic = 'basic',
    primary = 'primary',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    text = 'text',
    textFaded = 'textFaded',
    background = 'background',
    backgroundDark = 'backgroundDark',
    border = 'border'
}

export type IconSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg';
export type IconType =
    | 'asc'
    | 'barcode'
    | 'bolt'
    | 'boltSlash'
    | 'calendar'
    | 'check'
    | 'chevronLeft'
    | 'chevronRight'
    | 'close'
    | 'collection'
    | 'desc'
    | 'edit'
    | 'error'
    | 'filter'
    | 'folder'
    | 'flashlight'
    | 'flashlightSlash'
    | 'home'
    | 'music'
    | 'questionMark'
    | 'search'
    | 'sort'
    | 'starEmpty'
    | 'starFull'
    | 'starHalf'
    | 'users'
    | 'want'
    | 'warning';

export enum TextCategory {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6',
    s1 = 's1',
    s2 = 's2',
    p1 = 'p1',
    p2 = 'p2',
    c1 = 'c1',
    c2 = 'c2',
    label = 'label'
}

export type RatingPayload = {
    notes: string;
    clarity: number;
    flatness: number;
    quietness: number;
};
export type RatingPayloadKey = keyof RatingPayload;

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends RootStackParamList {}
//     }
// }

// export type RootStackParamList = {
//     Root: NavigatorScreenParams<RootTabParamList> | undefined;
//     Modal: undefined;
//     NotFound: undefined;
// };

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
//     NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

// export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
//     CompositeScreenProps<
//         BottomTabScreenProps<RootTabParamList, Screen>,
//         NativeStackScreenProps<RootStackParamList>
//     >;

export enum SearchTypes {
    RELEASE = 'release',
    ARTIST = 'artist',
    MASTER = 'master'
}

export type ArtistSearch = {
    cover_image: string;
    title: string;
    id: number;
    type: SearchTypes;
    thumb: string;
    user_data: UserData;
};

export type Member = {
    id: number;
    name: string;
    active: boolean;
    thumbnail_url: string;
};

export type ArtistDetail = {
    name: string;
    profile: string;
    namevariations: string[];
    images: DiscogsImage[];
    members: Member[];
};
