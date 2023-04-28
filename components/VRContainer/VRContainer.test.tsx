import React from 'react';
import { Text } from 'react-native';
import { waitFor } from '@testing-library/react-native';

import VRContainer from './VRContainer';
import { renderWithProvider } from 'test';

describe('VRContainer', () => {
    it('should render loading', async () => {
        const { getByTestId } = renderWithProvider(
            <VRContainer isLoading>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        await waitFor(() => {
            expect(getByTestId('loading')).toBeTruthy();
        });
    });
    it('should render correctly for scrollable', () => {
        const { getByTestId } = renderWithProvider(
            <VRContainer startAnimation>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(getByTestId('scroll')).toBeTruthy();
    });

    it('should render correctly for non-scrollable', () => {
        const { getByTestId } = renderWithProvider(
            <VRContainer startAnimation scrollable={false}>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(getByTestId('view')).toBeTruthy();
    });

    it('should render refresh', () => {
        const view = renderWithProvider(
            <VRContainer onRefresh={() => {}} refreshing>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(view).toMatchSnapshot();
    });
});
