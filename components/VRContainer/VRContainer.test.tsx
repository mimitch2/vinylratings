import React from 'react';
import { Text } from 'react-native';
import VRContainer from './VRContainer';

import { render, waitFor } from '@testing-library/react-native';

describe('VRContainer', () => {
    it('should render loading', async () => {
        const { getByTestId } = render(
            <VRContainer isLoading>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        await waitFor(() => {
            expect(getByTestId('loading')).toBeTruthy();
        });
    });
    it('should render correctly for scrollable', () => {
        const { getByTestId } = render(
            <VRContainer startAnimation>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(getByTestId('scroll')).toBeTruthy();
    });

    it('should render correctly for non-scrollable', () => {
        const { getByTestId } = render(
            <VRContainer startAnimation scrollable={false}>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(getByTestId('view')).toBeTruthy();
    });

    it('should render refresh', () => {
        const view = render(
            <VRContainer onRefresh={() => {}} refreshing>
                <Text>Testing this yo</Text>
            </VRContainer>
        );

        expect(view).toMatchSnapshot();
    });
});
