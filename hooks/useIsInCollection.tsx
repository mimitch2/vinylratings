import { useQuery, gql } from '@apollo/client';

export const IS_IN_COLLECTION = gql`
    query IsInCollection($id: Int!) {
        getReleaseInCollection(id: $id) {
            isInCollection
            releases {
                id
                date_added
                instance_id
                folder_id
            }
        }
    }
`;

export const useIsInCollection = ({
    releaseId,
    skip = false
}: {
    releaseId: number;
    skip?: boolean;
}) => {
    const { data, loading, error, refetch } = useQuery(IS_IN_COLLECTION, {
        variables: {
            id: releaseId
        },
        skip
    });

    return {
        isInCollection: !!data?.getReleaseInCollection?.isInCollection,
        instanceId: +data?.getReleaseInCollection?.releases[0]?.instance_id,
        releases: data?.getReleaseInCollection?.releases,
        isInCollectionLoading: loading,
        isInCollectionError: error,
        refetchIsInCollection: refetch
    };
};
