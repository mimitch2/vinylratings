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
            pagination {
                items
                page
                pages
                per_page
            }
            results {
                id
                rating
                basic_information {
                    id
                    title
                    artists {
                        name
                    }
                    user_data {
                        in_collection
                        in_wantlist
                    }
                    formats {
                        name
                    }
                    year
                    country
                    genres
                    styles
                    thumb
                }
            }
        }
    }
`;
