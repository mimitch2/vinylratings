import { gql } from '@apollo/client';

export const IS_IN_COLLECTION = gql`
    query IsInCollection($id: Int!) {
        getReleaseInCollection(id: $id) {
            isInCollection
        }
    }
`;

export const GET_RELEASE = gql`
    query GetRelease($id: Int!, $instanceId: Int) {
        getRelease(id: $id, instanceId: $instanceId) {
            labels {
                name
            }
            series {
                name
            }
            companies {
                name
                entity_type_name
            }
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
                        discogsUserId
                        releasesRated
                        vinylRatings {
                            _id
                            quietness
                            flatness
                            clarity
                            rating
                            createdAt
                            notes
                            updatedAt
                        }
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
    mutation AddRelease(
        $releaseId: Int!
        $instanceId: Int!
        $title: String!
        $artist: String!
    ) {
        addRelease(
            releaseId: $releaseId
            instanceId: $instanceId
            title: $title
            artist: $artist
        ) {
            releaseId
            title
            artist
            quietnessAvg
            flatnessAvg
            clarityAvg
            ratingAvg
            ratingsCount
            userCopy {
                instanceId
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
        $instanceId: Int!
        $washedOn: String!
        $title: String!
        $artist: String!
    ) {
        addWashedOn(
            releaseId: $releaseId
            instanceId: $instanceId
            washedOn: $washedOn
            title: $title
            artist: $artist
        ) {
            washedOn
            releaseId
            instanceId
        }
    }
`;
