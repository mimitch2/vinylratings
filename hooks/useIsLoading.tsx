import { useState } from 'react';

export const useIsLoading = ({ loadingArray }: { loadingArray: boolean[] }) => {
    const [loading, setLoading] = useState(false);

    return loadingArray.some((bool) => bool);
};
