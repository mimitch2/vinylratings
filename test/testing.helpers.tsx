import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

export const renderWithProvider = ({
    children,
    mocks = []
}: {
    children: React.ReactNode;
    mocks?: any;
}) => {
    return render(<MockedProvider mocks={mocks}>{children}</MockedProvider>);
};

export const flushPromises = () => {
    return new Promise((resolve) => {
        return setImmediate(resolve);
    });
};
