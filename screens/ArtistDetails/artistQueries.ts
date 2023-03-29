import { gql } from '@apollo/client';

export const GET_ARTIST = gql`
    query GetArtist($id: Int!) {
        getArtist(id: $id) {
            name
            profile
            namevariations
            images {
                resource_url
                height
                width
            }
            members {
                id
                name
                active
                thumbnail_url
            }
        }
    }
`;
