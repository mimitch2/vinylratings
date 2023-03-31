import { StyleSheet, Dimensions } from 'react-native';
import { PayloadKeys } from 'types';

const commonSortOptions = [
    { value: 'added', label: 'Added' },
    { value: 'artist', label: 'Artist' },
    { value: 'title', label: 'Title' },
    { value: 'label', label: 'Label' },
    { value: 'year', label: 'Year' }
];

export const SORT_BY_OPTIONS_COLLECTION = commonSortOptions;

const clonedSortOptions = [...commonSortOptions];
clonedSortOptions.splice(2, 0, {
    value: 'genre/artist',
    label: 'Genre -> Artist'
});

export const SORT_BY_OPTIONS_WANT_LIST = clonedSortOptions;
export const SORT_BY_OPTIONS_ARTIST = [
    { value: 'artist', label: 'Artist' },
    { value: 'label', label: 'Label' }
];

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
export const MODAL_HEIGHT_OFFSET = 90;

export const RATING_CATEGORIES: PayloadKeys[] = [
    'clarity',
    'quietness',
    'flatness'
];

export const globalStyles = StyleSheet.create({
    centerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowCenterCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alignCenter: {
        alignItems: 'center'
    },
    rowAlignCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    rowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
