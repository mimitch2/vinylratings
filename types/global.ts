import { COLORS_MAP } from 'constants/index';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    CompositeScreenProps,
    NavigatorScreenParams
} from '@react-navigation/native';
import { UserData, DiscogsImage } from './releases';

export type VoidFunc = <T>(params: T | undefined) => void;
export type VoidFuncNoParams = () => void;

export type Colors = keyof typeof COLORS_MAP.light;

export type IconSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg';
export type IconType =
    | 'asc'
    | 'barcode'
    | 'check'
    | 'chevronRight'
    | 'close'
    | 'collection'
    | 'desc'
    | 'error'
    | 'filter'
    | 'flashlight'
    | 'folder'
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

export type RatingPayload = {
    notes: string;
    clarity: number;
    flatness: number;
    quietness: number;
};
export type PayloadKeys = keyof RatingPayload;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;

export enum SearchTypes {
    RELEASE = 'release',
    ARTIST = 'artist',
    MASTER = 'master',
    LABEL = 'label'
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
