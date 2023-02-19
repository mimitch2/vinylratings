import React from 'react';

interface Context {
    setDisabled: React.Dispatch<React.SetStateAction<boolean>> | null;
    disabled: boolean;
}

export const DisabledContext = React.createContext<Context>({
    setDisabled: null,
    disabled: false
});
