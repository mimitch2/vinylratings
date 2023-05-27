import { gql } from '@apollo/client';

export const RELEASES_FRAGMENT = gql`
    fragment ReleasesFragment on Release {
        id
        date_added
        instance_id
        rating
        folder_id
        notes {
            field_id
            value
        }
        basic_information {
            title
            thumb
            year
            artists {
                name
            }
            type
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
`;

export const GET_COLLECTION = gql`
    query GetCollection(
        $folder: Int
        $page: Int
        $per_page: Int
        $sort: String
        $sort_order: String
        $offset: Int
        $limit: Int
    ) {
        getCollection(
            folder: $folder
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
            releases {
                id
                date_added
                instance_id
                rating
                folder_id
                notes {
                    field_id
                    value
                }
                basic_information {
                    title
                    thumb
                    year
                    artists {
                        name
                    }
                    type
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
