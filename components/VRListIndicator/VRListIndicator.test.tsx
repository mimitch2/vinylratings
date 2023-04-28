import React from 'react';

import VRListIndicator from './VRListIndicator';
import { renderWithProvider } from 'test';

describe('VRListIndicator', () => {
    it('should not render any icons', () => {
        const { queryByTestId } = renderWithProvider(
            <VRListIndicator
                userData={{
                    in_collection: false,
                    in_wantlist: false
                }}
            />
        );

        expect(queryByTestId('collection-icon')).toBeFalsy();
        expect(queryByTestId('want-icon')).toBeFalsy();
    });

    it('should only render collection icon', () => {
        const { queryByTestId } = renderWithProvider(
            <VRListIndicator
                userData={{
                    in_collection: true,
                    in_wantlist: false
                }}
            />
        );

        expect(queryByTestId('collection-icon')).toBeTruthy();
        expect(queryByTestId('want-icon')).toBeFalsy();
    });

    it('should only render want icon', () => {
        const { queryByTestId } = renderWithProvider(
            <VRListIndicator
                userData={{
                    in_collection: false,
                    in_wantlist: true
                }}
            />
        );

        expect(queryByTestId('collection-icon')).toBeFalsy();
        expect(queryByTestId('want-icon')).toBeTruthy();
    });

    it('should render both icons', () => {
        const { queryByTestId } = renderWithProvider(
            <VRListIndicator
                userData={{
                    in_collection: true,
                    in_wantlist: true
                }}
            />
        );

        expect(queryByTestId('collection-icon')).toBeTruthy();
        expect(queryByTestId('want-icon')).toBeTruthy();
    });
});
