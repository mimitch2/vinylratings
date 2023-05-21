import React from 'react';
import { Layout } from '@ui-kitten/components';

import { useIsInCollection } from 'hooks';
import { VRText, VRContainer } from 'components';

type Params = {
    id: string;
};

export type Route = {
    params: Params;
};

const Copies = ({ route }: { route: Route }) => {
    const {
        params: { id }
    } = route;
    const {
        isInCollection,
        releases,
        isInCollectionLoading,
        refetchIsInCollection
    } = useIsInCollection({
        releaseId: +id
    });
    console.log('🚀 ~ file: Copies.tsx:27 ~ Copies ~ releases:', releases);

    return (
        <VRContainer>
            <VRText>Copies</VRText>
        </VRContainer>
    );
};

export default Copies;
