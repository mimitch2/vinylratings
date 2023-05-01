import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import VRRatings from './VRRatings';
import { renderWithProvider } from 'test';
describe('VRRatings', () => {
    const discogsRating = { count: 10, average: 4 };
    const vinylRatingsRelease = {
        title: 'Foo',
        artist: 'Bar',
        currentUserRating: null,
        clarityAvg: 3,
        flatnessAvg: 4,
        quietnessAvg: 3,
        ratingAvg: 3.5,
        ratingsCount: 5,
        userCopy: {
            releaseId: 1234,
            washedOn: 'Never'
        },
        vinylRatings: [
            {
                _id: '123',
                quietness: 4,
                flatness: 4,
                clarity: 5,
                rating: 5,
                createdAt: 'foo',
                notes: 'cool',
                release: 'bar',
                updatedAt: 'stuff',
                user: {
                    username: 'me'
                }
            }
        ]
    };
    const setDiscogsReviewsModalOpen = jest.fn();

    test('renders RatingRow components', () => {
        const { getAllByTestId } = renderWithProvider(
            <VRRatings
                discogsRating={discogsRating}
                vinylRatingsRelease={vinylRatingsRelease}
                setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
            />
        );

        const ratingRows = getAllByTestId('rating-row');
        expect(ratingRows.length).toBe(6);
    });

    test('opens RatingsModal when See all ratings button is pressed', () => {
        const { getByText, getByTestId } = renderWithProvider(
            <VRRatings
                discogsRating={discogsRating}
                vinylRatingsRelease={vinylRatingsRelease}
                setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
            />
        );

        const ratingsButton = getByText('See all ratings');
        fireEvent.press(ratingsButton);

        const ratingsModal = getByTestId('ratings-modal');
        expect(ratingsModal.props.modalOpen).toBe(true);
    });

    test('calls setDiscogsReviewsModalOpen when Discogs reviews button is pressed', () => {
        const { getByText } = renderWithProvider(
            <VRRatings
                discogsRating={discogsRating}
                vinylRatingsRelease={vinylRatingsRelease}
                setDiscogsReviewsModalOpen={setDiscogsReviewsModalOpen}
            />
        );

        const discogsReviewsButton = getByText('Discogs reviews');
        fireEvent.press(discogsReviewsButton);

        expect(setDiscogsReviewsModalOpen).toHaveBeenCalledWith(true);
    });
});
