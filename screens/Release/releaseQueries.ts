import { gql } from '@apollo/client';

export const IS_IN_COLLECTION = gql`
    query IsInCollection($id: Int!) {
        getReleaseInCollection(id: $id) {
            isInCollection
        }
    }
`;

export const GET_RELEASE = gql`
    query GetRelease($id: Int!) {
        getRelease(id: $id) {
            uri
            id
            master_id
            title
            thumb
            artists_sort
            formats {
                qty
                text
                name
                descriptions
            }
            year
            images {
                resource_url
                height
                width
            }
            artists {
                name
            }
            genres
            tracklist {
                position
                title
                duration
            }
            identifiers {
                type
                value
                description
            }
            released
            notes
            country
            community {
                have
                want
                rating {
                    count
                    average
                }
            }
            vinylRatingsRelease {
                title
                artist
                flatnessAvg
                quietnessAvg
                clarityAvg
                ratingAvg
                ratingsCount
                userCopy {
                    releaseId
                    washedOn
                }
                currentUserRating {
                    quietness
                }
                vinylRatings {
                    _id
                    quietness
                    flatness
                    clarity
                    rating
                    createdAt
                    notes
                    release
                    updatedAt
                    user {
                        username
                        avatarUrl
                    }
                }
            }
        }
    }
`;

export const ADD_TO_COLLECTION = gql`
    mutation AddToCollection($releaseId: Int!, $folderId: Int!) {
        addToCollection(releaseId: $releaseId, folderId: $folderId) {
            instance_id
        }
    }
`;

export const REMOVE_FROM_COLLECTION = gql`
    mutation RemoveFromCollection(
        $folderId: Int!
        $releaseId: Int!
        $instanceId: Int!
    ) {
        removeFromCollection(
            folderId: $folderId
            releaseId: $releaseId
            instanceId: $instanceId
        ) {
            isGood
        }
    }
`;

export const ADD_RELEASE = gql`
    mutation AddRelease($releaseId: Int!, $title: String!, $artist: String!) {
        addRelease(releaseId: $releaseId, title: $title, artist: $artist) {
            releaseId
            title
            artist
            quietnessAvg
            flatnessAvg
            clarityAvg
            ratingAvg
            ratingsCount
            userCopy {
                releaseId
                washedOn
            }
        }
    }
`;

export const ADD_RATING = gql`
    mutation AddRating(
        $releaseId: Int!
        $quietness: Int!
        $clarity: Int!
        $flatness: Int!
        $notes: String
    ) {
        addRating(
            releaseId: $releaseId
            quietness: $quietness
            clarity: $clarity
            flatness: $flatness
            notes: $notes
        ) {
            quietness
            clarity
            flatness
        }
    }
`;

export const ADD_WASHED_ON = gql`
    mutation AddWashedOn(
        $releaseId: Int!
        $washedOn: String!
        $title: String!
        $artist: String!
    ) {
        addWashedOn(
            releaseId: $releaseId
            washedOn: $washedOn
            title: $title
            artist: $artist
        ) {
            washedOn
            releaseId
            # user
        }
    }
`;
