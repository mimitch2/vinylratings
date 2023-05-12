import { Releases, Pagination, SortOrder } from 'types';

export type QueryKey =
    | 'getCollection'
    | 'getMasterReleaseVersions'
    | 'getWantList'
    | 'getReleaseInCollection';

export type QueriedData = {
    pagination: Pagination;
    wants?: Releases[];
    releases?: Releases[];
    results?: Releases[] | [];
    versions?: Releases[] | [];
};

export type Data = {
    [key in QueryKey]: QueriedData;
};

export type Variables = {
    page: number;
    per_page: number;
    sort: string;
    sort_order: SortOrder;
    offset: number;
    limit: number;
    folder?: number;
    master_id?: number;
};
