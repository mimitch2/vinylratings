import React from 'react';

import VRRatingsStars from './VRRatingsStars';
import { renderWithProvider } from 'test';

describe('VRRatingsStars', () => {
    it('should render correctly for 0 stars', () => {
        const view = renderWithProvider(<VRRatingsStars average={0} />);

        expect(view).toMatchSnapshot();
    });

    it('should render correctly for 3.5 stars', () => {
        const view = renderWithProvider(<VRRatingsStars average={3.5} />);

        expect(view).toMatchSnapshot();
    });

    it('should render correctly for 5 stars', () => {
        const view = renderWithProvider(<VRRatingsStars average={3.5} />);

        expect(view).toMatchSnapshot();
    });

    it('should render different size', () => {
        const view = renderWithProvider(
            <VRRatingsStars average={3.5} size="sm" />
        );

        expect(view).toMatchSnapshot();
    });
});
