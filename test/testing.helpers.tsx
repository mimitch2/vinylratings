import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { default as darkTheme } from 'constants/themeDark.json';

export const renderWithProvider = (
    children: React.ReactNode,
    mocks: any = []
) => {
    return render(
        <MockedProvider mocks={mocks}>
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
                {children}
            </ApplicationProvider>
        </MockedProvider>
    );
};

export const flushPromises = () => {
    return new Promise((resolve) => {
        return setImmediate(resolve);
    });
};
