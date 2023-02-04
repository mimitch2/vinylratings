import { gql } from '@apollo/client';

export const GET_WANT_LIST = gql`
    query GetWantList(
        $page: Int
        $per_page: Int
        $sort: String
        $sort_order: String
        $offset: Int
        $limit: Int
    ) {
        getWantList(
            page: $page
            per_page: $per_page
            sort: $sort
            sort_order: $sort_order
            offset: $offset
            limit: $limit
        ) {
            pagination {
                items
                page
                pages
                per_page
            }
            wants {
                rating
                id
                basic_information {
                    title
                    thumb
                    year
                    artists {
                        name
                    }
                    genres
                    styles
                    formats {
                        name
                        qty
                        text
                        descriptions
                    }
                }
            }
        }
    }
`;
