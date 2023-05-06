import { useState } from 'react';

export const useIsLoading = (...args: boolean[]) => {
    const [loading, setLoading] = useState(false);

    return args.some((bool) => bool);
};
