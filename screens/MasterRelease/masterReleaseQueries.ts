import { gql } from '@apollo/client';

export const GET_MASTER_RELEASE = gql`
    query GetMasterRelease($id: Int!) {
        getMasterRelease(id: $id) {
            artists {
                name
            }
            genres
            id
            lowest_price
            main_release
            most_recent_release
            num_for_sale
            released
            styles
            title
            tracklist {
                duration
                position
                title
            }
            year
            images {
                height
                resource_url
                width
            }
        }
    }
`;
