import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { Data } from 'types';
import { COLLECTION_INSTANCE_FRAGMENT } from 'screens/Collection/collectionQueries';

export const IS_IN_COLLECTION = gql`
    ${COLLECTION_INSTANCE_FRAGMENT}
    query IsInCollection($id: Int!) {
        getReleaseInCollection(id: $id) {
            isInCollection
            releases {
                ...CollectionInstanceFragment
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
