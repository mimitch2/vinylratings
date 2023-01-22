import { COLORS_MAP } from 'constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    CompositeScreenProps,
    NavigatorScreenParams
} from '@react-navigation/native';

export type VoidFunc = <T>(params: T | undefined) => void;
export type VoidFuncNoParams = () => void;

export type Colors = keyof typeof COLORS_MAP.light;

export type IconSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg';
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
