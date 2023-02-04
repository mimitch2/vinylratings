import { gql } from '@apollo/client';

export const GET_VERSIONS = gql`
    query GetMasterReleaseVersions(
        $master_id: ID!
        $page: Int
        $per_page: Int
        $sort: String
        $sort_order: String
        $released: String
        $country: String
    ) {
        getMasterReleaseVersions(
            master_id: $master_id
            page: $page
            per_page: $per_page
            sort: $sort
            sort_order: $sort_order
            released: $released
            country: $country
        ) {
            pagination {
                items
                page
                pages
                per_page
            }
            versions {
                id
                rating
                basic_information {
                    id
                    title
                    thumb
                    label
                    country
                    formats {
                        text
                    }
                    format
                    released
                    styles
                    genres
                    artists {
                        name
                    }
                    user_data {
                        in_collection
                        in_wantlist
                    }
                }
            }
        }
    }
`;
