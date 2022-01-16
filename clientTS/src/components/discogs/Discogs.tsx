import React, { useState, useEffect } from 'react';
import { useApiService } from 'services';

const Discogs: React.FC = () => {
    // collection
    const [discogsCollectionPage, setDiscogsCollectionPage] = useState(1);
    const [discogsFolder, setDiscogsFolder] = useState(0);
    const [
        {
            fetchedData,
            isLoading,
            error
        },
        setDiscogsCollection
    ] = useApiService({
        route: 'discogs/collection',
        params: { folder: discogsFolder, page: discogsCollectionPage },
        dependencies: [discogsFolder, discogsCollectionPage]
    })

    console.log(fetchedData,
        isLoading,
        error);


    return (
        <div className="App">
            Heloooo    </div>
    );
}

export default Discogs;
