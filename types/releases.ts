import { MutableRefObject } from 'react';
import { FlashList } from '@shopify/flash-list';

import { User } from './user';
import { SearchTypes } from './global';

export type FlashListRef = MutableRefObject<FlashList<Releases> | null>;

export type DiscogsImage = {
    resource_url: string;
    height: number;
    width: number;
};
export interface Pagination {
    items: number;
    page: number;
    pages: number;
    per_page: number;
    urls?: {
        next: string;
        last: string;
    };
}

export type Format = {
    qty: string;
    text: string | null;
    name: string;
    descriptions: string[];
};

export type Artist = {
    id?: number;
    name: string;
};

export type DiscogsTrackList = {
    position: string;
    title: string;
    duration: string;
};

export type DiscogsIdentifiers = {
    type: string;
    value: string;
    description?: string;
};

export type BasicInformation = {
    uri?: string;
    artists: Artist[];
    title: string;
    styles: string[];
    thumb: string | null;
    formats: Format[];
    genres: string[];
    year: number;
    country?: string;
    format?: string;
    released?: string;
    label?: string;
    user_data?: UserData;
    type: SearchTypes;
};

export type DiscogsVersion = {
    title: string;
    id: string;
    thumb: string;
    year: number;
    country: string;
    formats: [];
    styles: [];
    genres: [];
    artists: [];
    format: string[];
    released: string;
    label: string[];
    user_data: UserData;
};

export interface Releases {
    header?: boolean;
    basic_information: BasicInformation;
    date_added?: string;
    folder_id?: string;
    id: number;
    instance_id?: number;
    rating?: number;
}

export interface UserData {
    in_collection: boolean;
    in_wantlist: boolean;
}
export interface SearchResults {
    id: number;
    basic_information: BasicInformation;
}

export type DiscogsRating = {
    count: number;
    average: number;
};

export type DiscogsCommunity = {
    have: number;
    want: number;
    rating: DiscogsRating;
};

export type UserCopy = {
    releaseId: number;
    washedOn: string;
};

export type VinylRating = {
    _id: string;
    quietness: number;
    flatness: number;
    clarity: number;
    rating: number;
    createdAt: string;
    notes: string;
    release: string;
    updatedAt: string;
    user: User;
};

export type VinylRatingsRelease = {
    title: string;
    artist: string;
    clarityAvg: number;
    currentUserRating: number | null;
    flatnessAvg: number;
    quietnessAvg: number;
    ratingAvg: number;
    ratingsCount: number;
    userCopy: UserCopy;
    vinylRatings: VinylRating[];
} | null;

type Label = {
    name: string;
};

type Company = {
    name: string;
    entity_type_name: string;
};

type SeriesEntry = {
    name: string;
    entity_type_name: string;
};

export interface DiscogsRelease extends BasicInformation {
    uri: string;
    master_id: number;
    vinylRatingsRelease: any;
    images: DiscogsImage[];
    tracklist: DiscogsTrackList[];
    identifiers: DiscogsIdentifiers[];
    released: string;
    notes: string;
    country: string;
    community: DiscogsCommunity;
    labels: [Label] | [];
    companies: [Company] | [];
    series: [SeriesEntry] | [];
}

export type Folder = {
    name: string;
    id: number;
    count: number;
};

export type SortOrder = 'asc' | 'desc';
