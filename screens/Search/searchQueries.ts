import { gql } from '@apollo/client';

export const GET_SEARCH = gql`
    query GetSearch(
        $search: String
        $type: String
        $sort: String
        $sort_order: String
        $page: Int
        $per_page: Int
        $offset: Int
        $limit: Int
    ) {
        getSearch(
            search: $search
            limit: $limit
            offset: $offset
            page: $page
            per_page: $per_page
            sort: $sort
            sort_order: $sort_order
            type: $type
        ) {
            ... on ReleasesSearchResult {
                isReleases
                results {
                    date_added
                    id
                    rating
                    basic_information {
                        title
                        type
                        artists {
                            name
                        }
                        country
                        format
                        formats {
                            descriptions
                            name
                            qty
                            text
                        }
                        genres
                        id
                        label
                        released
                        styles
                        thumb
                        year
                        user_data {
                            in_collection
                            in_wantlist
                        }
                    }
                }
                pagination {
                    items
                    page
                    pages
                    per_page
                }
            }
            ... on ArtistSearchResult {
                isArtists
                pagination {
                    items
                    page
                    pages
                    per_page
                }
                results {
                    cover_image
                    id
                    thumb
                    title
                    type
                }
            }
            ... on MasterSearchResult {
                isMasters
                pagination {
                    items
                    page
                    pages
                    per_page
                }
                results {
                    basic_information {
                        artists {
                            name
                        }
                        country
                        format
                        formats {
                            descriptions
                            name
                            qty
                            text
                        }
                        genres
                        id
                        label
                        released
                        styles
                        thumb
                        title
                        type
                        user_data {
                            in_collection
                            in_wantlist
                        }
                        year
                    }
                    id
                    rating
                    date_added
                }
            }
        }
    }
`;

export const GET_RELEASE_SEARCH = gql`
    query GetReleaseSearch(
        $search: String
        $sort: String
        $sort_order: String
        $page: Int
        $per_page: Int
        $offset: Int
        $limit: Int
    ) {
        getReleaseSearch(
            search: $search
            sort: $sort
            sort_order: $sort_order
            page: $page
            per_page: $per_page
            offset: $offset
            limit: $limit
        ) {
            pagination {
                items
                page
                pages
                per_page
            }
            results {
                id
                date_added
                folder_id
                instance_id
                rating
                basic_information {
                    format
                    country
                    artists {
                        name
                    }
                    genres
                    formats {
                        descriptions
                        name
                        qty
                        text
                    }
                    id
                    label
                    released
                    styles
                    thumb
                    title
                    type
                    user_data {
                        in_collection
                        in_wantlist
                    }
                    year
                }
            }
        }
    }
`;
