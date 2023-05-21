import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { Data } from 'types';

export const IS_IN_COLLECTION = gql`
    query IsInCollection($id: Int!) {
        getReleaseInCollection(id: $id) {
            isInCollection
            releases {
                id
                date_added
                instance_id
                folder_id
                notes {
                    field_id
                    value
                }
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
        isInCollection: !!data?.getReleaseInCollection?.isInCollection ?? false,
        releases: data?.getReleaseInCollection?.releases,
        isInCollectionLoading: loading,
        isInCollectionError: error,
        refetchIsInCollection: refetch
    };
};
