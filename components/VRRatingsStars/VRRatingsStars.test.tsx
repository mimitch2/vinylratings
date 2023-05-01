import React from 'react';

import VRRatingsStars from './VRRatingsStars';
import { renderWithProvider } from 'test';

describe('VRRatingsStars', () => {
    it.each([[0], [1], [1.3], [1.5], [2], [2.5], [3], [3.5], [4], [4.5], [5]])(
        'should render correctly for %s stars',
        (average) => {
            const view = renderWithProvider(
                <VRRatingsStars average={average} />
            );
            expect(view).toMatchSnapshot();
        }
    );

    it('should render different size', () => {
        const view = renderWithProvider(
            <VRRatingsStars average={3.5} size="sm" />
        );

        expect(view).toMatchSnapshot();
    });
});
