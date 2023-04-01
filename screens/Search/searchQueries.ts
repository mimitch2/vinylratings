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
            type: $type
            sort: $sort
            sort_order: $sort_order
            page: $page
            per_page: $per_page
            offset: $offset
            limit: $limit
        ) {
            ... on ArtistSearchResult {
                isArtists
                pagination {
                    items
                    page
                    pages
                    per_page
                }
                results {
                    title
                    cover_image
                    id
                    thumb
                    type
                    user_data {
                        in_collection
                        in_wantlist
                    }
                }
            }
            ... on ReleasesSearchResult {
                isReleases
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
            ... on MasterSearchResult {
                isMasters
                pagination {
                    items
                    page
                    pages
                    per_page
                }
                results {
                    id
                    basic_information {
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
    }
`;
